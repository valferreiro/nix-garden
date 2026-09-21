import type { GardenStage } from "../utils/garden"

type GardenStatusProps = {
    garden: GardenStage
}

function GardenStatus({ garden }: GardenStatusProps) {
    return(
        <div className={`garden-status ${garden.stage}`}>
            <span className="garden-status-emoji">
                {garden.emoji}
            </span>

            <div>
                <h2>{garden.name}</h2>
                <p>{garden.message}</p>
            </div>
        </div>
    )
}

export default GardenStatus