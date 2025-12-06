import { useEffect, useState } from 'react';
import { getStats } from '../api/stats';

const StatsPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getStats();
                if (data && data.success) {
                    setStats(data.data);
                } else {
                    setError('Failed to load stats');
                }
            } catch (err) {
                setError('Error fetching stats');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading stats...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    if (!stats) return null;

    return (
        <div className="container mx-auto p-4 max-w-5xl">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Live Analytics</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                    label="Total Users"
                    value={stats.users.total}
                    icon="👥"
                    color="bg-blue-100 text-blue-600"
                />
                <StatCard
                    label="New Users (Today)"
                    value={stats.users.newToday}
                    icon="🆕"
                    color="bg-green-100 text-green-600"
                />
                <StatCard
                    label="Total Visits"
                    value={stats.visits.total}
                    icon="👀"
                    color="bg-purple-100 text-purple-600"
                />
                <StatCard
                    label="Visits Today"
                    value={stats.visits.today}
                    icon="📈"
                    color="bg-orange-100 text-orange-600"
                />
            </div>

            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Content Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatCard
                    label="Total Questions"
                    value={stats.content.questions}
                    icon="❓"
                    color="bg-indigo-100 text-indigo-600"
                />
                <StatCard
                    label="Total Answers"
                    value={stats.content.answers}
                    icon="💬"
                    color="bg-teal-100 text-teal-600"
                />
            </div>
        </div>
    );
};

const StatCard = ({ label, value, icon, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
        <div className={`p-4 rounded-full ${color} mr-4 text-xl`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-sm">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

export default StatsPage;
