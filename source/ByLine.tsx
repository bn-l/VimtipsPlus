
export default function ByLine({ tipId, editLink, repoLink }: { tipId: string; editLink: string; repoLink: string }) {
    return (
        <div id="byline">
            <div>Tip ID#: {tipId}</div>
            <div><a href={editLink}>edit</a></div>
            <div><a href={repoLink}>Vim Tips PLUS</a> by bn-l</div>
        </div>
    );
}
