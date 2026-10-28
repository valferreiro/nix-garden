import type { DashboardStats } from '../utils/dashboard'

type DashboardProps = {
    stats: DashboardStats
}

function Dashboard({ stats }: DashboardProps) {
    return (
        <section
            className="dashboard"
            aria-label="Resumen de tu progreso">

            <div className="dashboard-card">
                <span className="dashboard-label">
                    Hoy
                </span>
                <strong className="dashboard-value">
                    {stats.completedToday}/{stats.totalHabits}
                </strong>
            </div>

            <div className="dashboard-card">
                <span className="dashboard-label">
                    Progreso
                </span>
                <strong className="dashboard-value">
                    {stats.progress}%
                </strong>
            </div>

            <div className="dashboard-card">
                <span className="dashboard-label">
                    Mejor racha
                </span>
                <strong className="dashboard-value">
                    {stats.bestStreak}
                    {stats.bestStreak === 1 ? ' día ' : ' días'}
                </strong>
            </div>
        </section>
    )
}

export default Dashboard 