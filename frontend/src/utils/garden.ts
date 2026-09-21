export type GardenStage = {
    name: string
    emoji: string
    message: string
    stage: string
}

export const getGardenStage = (
    progress: number,
): GardenStage => {
    if (progress >= 76) {
        return {
            name: "¡Jardín Mágico!",
            emoji: "✨",
            message: "Tu jardín está lleno de magia",
            stage: "magical!",
        }    
    }

    if (progress >= 51) {
        return {
            name: "¡Jardín Floreciendo!",
            emoji: "🌷",
            message: "Tu jardín está empezando a florecer, sigue cultivando tus hábitos!",
            stage: "blooming!",
        }
    }

    if (progress >= 26) {
        return {
            name: "¡Jardín Creciendo!",
            emoji: "🪴",
            message: "Tu jardín comienza a crecer poco a poco!",
            stage: "growing",
        }
    }

    if (progress >= 1) {
        return {
            name: "¡Primeros Brotes!",
            emoji: "🌿",
            message: "Mira, los nuevos brotes que aparecieron en tu jardín!",
            stage: "sprout",
        }
    }

    return {
        name: "Jardín Dormido",
        emoji: "🌱",
        message: "Cultiva tu primer semilla, el jardín espera!",
        stage: "seed",
    }
}