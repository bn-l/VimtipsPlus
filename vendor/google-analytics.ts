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

class Analytics {

    public sessionData: SesssionData | null = null;

    constructor(
        protected debug: boolean = false
    ) {
        // pass
    }

    // Returns the client id, or creates a new one if one doesn"t exist.
    // Stores client id in local storage to keep the same client id as long as
    // the extension is installed.
    async getOrCreateClientId() {
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

    // Returns the current session id, or creates a new one if one doesn"t exist or
    // the previous one has expired.
    async getOrCreateSessionId() {
        // Use storage.session because it is only in memory

        if (chrome && chrome.storage) {
            this.sessionData = await chrome.storage.session.get("this.sessionData") as SesssionData;
        }


        // Check if session exists and is still valid
        if (this.sessionData && this.sessionData.timestamp) {
            // Calculate how long ago the session was last updated
            const durationInMin = (Date.now() - this.sessionData.timestamp) / 60_000;
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
            // Create and store a new session
            this.sessionData = {
                session_id: Date.now(),
                timestamp: Date.now(),
            };
            const storableSessionData = {
                session_id: this.sessionData.session_id.toString(),
                timestamp: this.sessionData.timestamp.toString(),
            };
            if (chrome && chrome.storage) {
                await chrome.storage.session.set({ sessionData: storableSessionData });
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

        try {
            const response = await fetch(
                `${ this.debug ? GA_DEBUG_ENDPOINT : GA_ENDPOINT
                }?measurement_id=${ MEASUREMENT_ID }&api_secret=${ API_SECRET }`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        client_id: await this.getOrCreateClientId(),
                        events: [
                            {
                                name,
                                params,
                            },
                        ],
                    }),
                }
            );
            if (!this.debug) {
                return;
            }
            console.log(await response.text());
        }
        catch (event_) {
            console.error("Google Analytics request failed with an exception", event_);
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
