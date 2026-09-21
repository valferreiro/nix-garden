export type GardenStage = {
    name: string
    emoji: string
    message: string
}

export const getGardenStage = (
    progress: number,
): GardenStage => {
    if (progress >= 76) {
        return {
            name: "¡Jardín Mágico!",
            emoji: "✨",
            message: "Tu jardín está lleno de magia",
        }    
    }

    if (progress >= 51) {
        return {
            name: "¡Jardín Floreciendo!",
            emoji: "🌷",
            message: "Tu jardín está empezando a florecer, sigue cultivando tus hábitos!",
        }
    }

    if (progress >= 26) {
        return {
            name: "¡Jardín Creciendo!",
            emoji: "🪴",
            message: "Tu jardín comienza a crecer poco a poco!",
        }
    }

    if (progress >= 1) {
        return {
            name: "¡Primeros Brotes!",
            emoji: "🌿",
            message: "Mira, los nuevos brotes que aparecieron en tu jardín!",
        }
    }

    return {
        name: "Jardín Dormido",
        emoji: "🌱",
        message: "Cultiva tu primer semilla, el jardín espera!"
    }
}