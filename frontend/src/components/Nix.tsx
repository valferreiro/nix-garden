import type { NixStage } from '../utils/nix'

type NixProps = {
    nix: NixStage
}

function Nix({ nix }: NixProps) {
    return (
        <div className="nix-status">
            <span
                className="nix-status-emoji"
                aria-label="Nix"
                >
                {nix.emoji}
                </span>
            <div>
                <h2>{nix.name}</h2>
                <p>{nix.message}</p>
            </div>
        </div>
    )
}

export default Nix