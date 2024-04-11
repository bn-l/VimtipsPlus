
export default function TipBody({ tipHtml }: { tipHtml: string }) {
    
    return (
        <div id="tip-body">

            <div id="tip-html" dangerouslySetInnerHTML={{ __html: tipHtml }}></div>
            
        </div>
    );
}
