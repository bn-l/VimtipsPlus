import { UAParser } from "ua-parser-js";


const GA_ENDPOINT = "https://www.google-analytics.com/mp/collect";
const GA_DEBUG_ENDPOINT = "https://www.google-analytics.com/debug/mp/collect";

// Get via https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#recommended_parameters_for_reports
const MEASUREMENT_ID = "G-Y5VX8X7V4D";
const API_SECRET = "oFMrCwvvSwe59m258AMT4A";
const DEFAULT_ENGAGEMENT_TIME_MSEC = 100;

// Duration of inactivity after which a new session is created
const SESSION_EXPIRATION_IN_MIN = 30;

type ParamValue = string | number | boolean | Array<any>;

type SesssionData = {
    session_id: number;
    timestamp: number;
};

// https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema
// https://developers.google.com/analytics/devguides/migration/api/reporting-ua-to-ga4-dims-mets
// https://ga-dev-tools.google/
// https://docs.adverity.com/reference/connectors/connector-google-analytics.htm

// Criteria ID	Name	Canonical Name	Parent ID	Country Code	Target Type	Status
// 1000002	Kabul	Kabul,Kabul,Afghanistan	9075393	AF	City	Active
// 1000003	Luanda	Luanda,Luanda Province,Angola	9070431	AO	City	Active
// 1000004	The Valley	The Valley,Anguilla	2660	AI	City	Active
// 1000007	Kralendijk	Kralendijk,Bonaire,Caribbean Netherlands	9075436	BQ	City	Active

type UserProperties = {
    browser: string | undefined;
    mobileDeviceBranding: string | undefined;
    operatingSystem: string | undefined;
    city: string | undefined;
    countryIsoCode: string | undefined;
};

class Analytics {

    public sessionData: SesssionData | null = null;
    public clientId: string | null = null;
    public userProperties: UserProperties | null = null;
    public uaParser: UAParser = new UAParser();

    constructor(
        protected debug: boolean = false
    ) {
        // pass
    }

    // Returns the client id, or creates a new one if one doesn"t exist.
    // Stores client id in local storage to keep the same client id as long as
    // the extension is installed.
    async getOrCreateClientId() {

        if (this.clientId) return this.clientId;

        let clientId: string | null = null;

        if (chrome && chrome.storage) {
            const clientIdObj = await chrome.storage.local.get("clientId") as { clientId: string };
            clientId = clientIdObj.clientId;
        }
        else {
            clientId = localStorage.getItem("clientId");
        }

        if (!clientId) {
            // Generate a unique client ID, the actual value is not relevant
            clientId = self.crypto.randomUUID();
            if (chrome && chrome.storage) {
                await chrome.storage.local.set({ clientId });
            }
            else {
                localStorage.setItem("clientId", clientId);
            }
        }

        return clientId;
    }

    async getOrCreateUserProperties() {
        
        if (this.userProperties) return this.userProperties;

        let userProperties: UserProperties | null = null;

        if (chrome && chrome.storage) {
            userProperties = await chrome.storage.local.get("userProperties") as UserProperties;
        }
        else {
            const json = localStorage.getItem("userProperties");
            if (json) userProperties = JSON.parse(json) as UserProperties;
        }

        if (!userProperties) {
            const location = await fetch("https://ipinfo.io/json");
            const locationData = await location.json();
            this.userProperties = {
                browser: this.uaParser.getBrowser().name,
                mobileDeviceBranding: this.uaParser.getDevice().vendor,
                operatingSystem: this.uaParser.getOS().name,
                city: locationData.city,
                countryIsoCode: locationData.country,
            };
            if (chrome && chrome.storage) {
                await chrome.storage.local.set({ userProperties: this.userProperties });
            }
            else {
                localStorage.setItem("userProperties", JSON.stringify(this.userProperties));
            }
        }

        return userProperties;
    }

    // Returns the current session id, or creates a new one if one doesn"t exist or
    // the previous one has expired.
    async getOrCreateSessionId() {
        // Use storage.session because it is only in memory

        if (!this.sessionData && (chrome && chrome.storage)) {
            this.sessionData = await chrome.storage.session.get("this.sessionData") as SesssionData;
        }

        // Check if session exists and is still valid
        if (this.sessionData?.timestamp) {
            // Calculate how long ago the session was last updated
            const durationInMin = (Date.now() - Number(this.sessionData.timestamp)) / 60_000;
            // Check if last update lays past the session expiration threshold
            if (durationInMin > SESSION_EXPIRATION_IN_MIN) {
                // Clear old session id to start a new session
                this.sessionData = null;
            }
            else {
                // Update timestamp to keep session alive
                this.sessionData.timestamp = Date.now();
                if (chrome && chrome.storage) {
                    await chrome.storage.session.set({ sessionData: this.sessionData });
                }
            }
        }

        if (!this.sessionData) {

            this.sessionData = { session_id: Date.now(), timestamp: Date.now() };
            if (chrome && chrome.storage) {
                await chrome.storage.session.set({ sessionData: this.sessionData });
            }
        }

        return this.sessionData.session_id;
    }

    // Fires an event with optional params. Event names must only include letters and underscores.
    async event(name: string, params: Record<string, ParamValue> = {}) {
        // Configure session id and engagement time if not present, for more details see:
        // https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#recommended_parameters_for_reports
        if (!params.session_id) {
            params.session_id = await this.getOrCreateSessionId();
        }
        if (!params.engagement_time_msec) {
            params.engagement_time_msec = DEFAULT_ENGAGEMENT_TIME_MSEC;
        }

        const client_id = await this.getOrCreateClientId();
        const userData = await this.getOrCreateUserProperties();

        const postBody = {
            client_id,
            user_id: client_id,
            events: [{
                name,
                params,
            }],
            user_data: {
                address: {
                    city: userData?.city,
                    country: userData?.countryIsoCode,
                },
            },
        };

        console.log("Sending event: ", postBody);

        try {
            const response = await fetch(
                `${ this.debug ? GA_DEBUG_ENDPOINT : GA_ENDPOINT
                }?measurement_id=${ MEASUREMENT_ID }&api_secret=${ API_SECRET }`,
                {
                    method: "POST",
                    body: JSON.stringify(postBody),
                }
            );
            if (!this.debug) {
                return;
            }
        }
        catch (event_) {
            // pass c
        }
    }

    // Fire a page view event.
    async pageView(pageTitle: string, pageLocation: string, additionalParams: Record<string, ParamValue> = {}) {
        return this.event("page_view", {
            page_title: pageTitle,
            page_location: pageLocation,
            ...additionalParams,
        });
    }

    // Fire an error event.
    async error(error: any, additionalParams: Record<string, ParamValue> = {}) {
        // Note: "error" is a reserved event name and cannot be used
        // see https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag#reserved_names
        return this.event("extension_error", {
            ...error,
            ...additionalParams,
        });
    }
}

export default new Analytics();
