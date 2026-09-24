import type { DashboardStats } from '../utils/dashboard'

type DashboradPropos = {
    stats: DashboardStats   
}

function Dashboard({ stats }: DashboradPropos) {
    return (
        <section 
            className="dashboard"
            arial-label="Resumen de tu Progreso"
        >

            <div className="dashboard-card">
                <span className="dashboard-label">
                    Hábitos
                </span>

                <strong className="dashboard-value">
                    {stats.totalHabits}
                </strong>
            </div>

            <div className="dashboard-card">
                <span className="dashboard-label">
                    Progreso
                </span>

                <strong className="dashboard-value">
                    {Math.round(stats.progress)}%
                </strong>
            </div>

            <div className="dashboard-card">
                <span className="dashboard-label">
                    Racha Actual
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