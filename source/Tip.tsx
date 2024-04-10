
export function Tip({ tipHtml, tipId, idLineNumber }: Tip) {
    
    return (
        <div id="tip">

            <div id="tip-body" dangerouslySetInnerHTML={{ __html: tipHtml }}></div>

            <a href={`https://github.com/bn-l/vimtips-plus/edit/main/source/tips.md?plain=1#L${ idLineNumber }`} target="_blank" rel="noopener noreferrer">
                Edit this tip on GitHub
            </a>

            <div id="tip-id">Tip {tipId}</div>
            
        </div>
    );
}
