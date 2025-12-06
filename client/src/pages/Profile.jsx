import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getQuestions } from '../features/questions/questionSlice';
import { Award, BookOpen, Clock, MapPin, MessageSquare, Star, ThumbsUp, User } from 'lucide-react';
import EditProfileModal from '../components/EditProfileModal';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const { questions, isLoading } = useSelector((state) => state.questions);
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState('summary');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        if (user) {
            // Fetch questions authored by this user
            dispatch(getQuestions(`author=${user.id}`));
            // Note: Currently we don't have an endpoint for answers by author easily, so we focus on questions.
        }
    }, [user, dispatch]);

    if (!user) {
        return <div className="container mx-auto mt-10 text-center">Please log in to view profile.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 mb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    {/* Avatar */}
                    <div className="relative">
                        <img
                            src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff&size=128`}
                            alt={user.name}
                            className="w-32 h-32 rounded-lg shadow-md"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full border border-white shadow-sm flex items-center gap-1">
                            <Star size={12} fill="currentColor" /> {user.reputation || 0}
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h1>
                        <p className="text-lg text-gray-600 mb-4">{user.bio || 'Medical Student • Lifelong Learner'}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <BookOpen size={16} />
                                <span>{user.school || 'Unknown School'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Award size={16} />
                                <span>{user.year || 'Student'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock size={16} />
                                <span>Joined {new Date(user.createdAt || Date.now()).toLocaleDateString()}</span>
                            </div>
                            {user.location && (
                                <div className="flex items-center gap-1">
                                    <MapPin size={16} />
                                    <span>{user.location}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition text-sm font-medium"
                        >
                            Edit Profile
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium">
                            Network Profile
                        </button>
                    </div>
                </div>
            </div>

            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Left Sidebar - Stats */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4">
                        <h3 className="font-bold text-gray-700 mb-3 text-lg">Stats</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-2 bg-gray-50 rounded">
                                <div className="text-xl font-bold text-blue-600">{user.reputation || 0}</div>
                                <div className="text-xs text-gray-500">reputation</div>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded">
                                <div className="text-xl font-bold text-blue-600">{questions ? questions.length : 0}</div>
                                <div className="text-xs text-gray-500">questions</div>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded">
                                <div className="text-xl font-bold text-blue-600">0</div>
                                <div className="text-xs text-gray-500">answers</div>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded">
                                <div className="text-xl font-bold text-blue-600">Top 10%</div>
                                <div className="text-xs text-gray-500">estimated</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4">
                        <h3 className="font-bold text-gray-700 mb-3 text-lg">Badges</h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded border border-yellow-200">
                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Scholar
                            </span>
                            <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded border border-gray-200">
                                <span className="w-2 h-2 rounded-full bg-gray-500"></span> Student
                            </span>
                            <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded border border-orange-200">
                                <span className="w-2 h-2 rounded-full bg-orange-500"></span> First Question
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Content - Tabs */}
                <div className="md:col-span-3">
                    <div className="flex border-b border-gray-200 mb-4">
                        <button
                            onClick={() => setActiveTab('summary')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'summary' ? 'border-b-2 border-orange-500 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Summary
                        </button>
                        <button
                            onClick={() => setActiveTab('questions')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'questions' ? 'border-b-2 border-orange-500 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Questions ({questions ? questions.length : 0})
                        </button>
                        <button
                            onClick={() => setActiveTab('answers')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'answers' ? 'border-b-2 border-orange-500 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Answers (0)
                        </button>
                    </div>

                    {activeTab === 'summary' && (
                        <div className="space-y-6">
                            <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Star className="text-blue-500" /> Top Questions
                                </h2>
                                {isLoading ? <p>Loading...</p> : (
                                    <div className="space-y-4">
                                        {questions && questions.length > 0 ? questions.slice(0, 3).map(q => (
                                            <div key={q._id} className="flex gap-4 items-start border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                                                <div className="flex flex-col items-center min-w-[60px] text-gray-500 text-xs gap-1">
                                                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded font-bold">{q.votes?.up?.length - q.votes?.down?.length || 0}</div>
                                                    <span>votes</span>
                                                </div>
                                                <div className="flex-1">
                                                    <Link to={`/question/${q._id}`} className="text-blue-600 hover:text-blue-800 font-medium text-lg block">
                                                        {q.title}
                                                    </Link>
                                                    <div className="flex gap-2 mt-1">
                                                        {q.tags.map(t => (
                                                            <span key={t._id} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs">{t.name}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )) : <p className="text-gray-500 italic">No questions asked yet.</p>}
                                    </div>
                                )}
                                <div className="mt-4 text-right">
                                    <button onClick={() => setActiveTab('questions')} className="text-blue-600 hover:text-blue-800 text-sm font-medium">View all questions →</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'questions' && (
                        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                            {isLoading ? <div className="p-6">Loading...</div> : (
                                <div className="divide-y divide-gray-100">
                                    {questions && questions.map(q => (
                                        <div key={q._id} className="p-4 flex gap-4">
                                            <div className="text-center min-w-[50px]">
                                                <div className="font-bold text-lg text-gray-700">{q.votes?.up?.length || 0}</div>
                                                <div className="text-xs text-gray-500">votes</div>
                                            </div>
                                            <div>
                                                <Link to={`/question/${q._id}`} className="text-blue-600 hover:text-blue-800 font-medium text-lg">
                                                    {q.title}
                                                </Link>
                                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                    {q.body.substring(0, 150)}...
                                                </p>
                                                <div className="flex gap-2 mt-2">
                                                    {q.tags.map(t => (
                                                        <span key={t._id} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{t.name}</span>
                                                    ))}
                                                    <span className="text-xs text-gray-400 ml-auto">Asked {new Date(q.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {(!questions || questions.length === 0) && <div className="p-6 text-gray-500">No questions found.</div>}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'answers' && (
                        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-10 text-center">
                            <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No answers yet</h3>
                            <p className="text-gray-500 mt-1">When you answer questions, they will appear here.</p>
                            <Link to="/" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                                Browse Questions
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Profile;
