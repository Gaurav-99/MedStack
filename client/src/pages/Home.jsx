import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestions, reset } from '../features/questions/questionSlice';
import { MessageCircle, ThumbsUp, Eye } from 'lucide-react';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { questions, isLoading, isError, message } = useSelector(
        (state) => state.questions
    );

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        dispatch(getQuestions());

        return () => {
            dispatch(reset());
        };
    }, [isError, message, dispatch]);

    if (isLoading) {
        return <div className="text-center mt-10">Loading questions...</div>;
    }

    return (
        <div className='container mx-auto px-4 max-w-4xl'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold text-gray-800'>Medical Feed</h1>
                <Link to='/ask' className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition'>
                    Ask Question
                </Link>
            </div>

            <div className='space-y-4'>
                {questions.length > 0 ? (
                    questions.map((question) => (
                        <div key={question._id} className='bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition'>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center space-y-2 text-gray-500 min-w-[60px]">
                                    <div className="text-center">
                                        <span className="block font-bold text-gray-700">{question.votes ? question.votes.up.length - question.votes.down.length : 0}</span>
                                        <span className="text-xs">votes</span>
                                    </div>
                                    <div className={`text-center ${question.answers?.length > 0 ? 'text-green-600 border px-2 rounded border-green-600' : ''}`}>
                                        <span className="block font-bold">{Array.isArray(question.answers) ? question.answers.length : 0}</span>
                                        <span className="text-xs">answers</span>
                                    </div>
                                    <div className="text-center text-xs text-gray-400">
                                        <span className="block">{question.viewCount || 0}</span>
                                        <span>views</span>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <Link to={`/questions/${question._id}`} className='text-xl font-medium text-blue-600 hover:text-blue-800 mb-2 block'>
                                        {question.title}
                                    </Link>
                                    <p className='text-gray-600 text-sm line-clamp-2 mb-3'>
                                        {question.body}
                                    </p>

                                    <div className="flex justify-between items-center text-xs">
                                        <div className="flex gap-2">
                                            {question.tags && question.tags.map(tag => (
                                                <span key={tag._id || tag} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                                    {tag.name || 'tag'}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center space-x-2 text-gray-500">
                                            {question.author && (
                                                <>
                                                    <img src={question.author.avatarUrl || 'https://via.placeholder.com/20'} alt="avatar" className="w-5 h-5 rounded-full" />
                                                    <span className="text-blue-500">{question.author.name}</span>
                                                </>
                                            )}
                                            <span>asked {new Date(question.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center py-10">No questions found. Be the first to ask!</p>
                )}
            </div>
        </div>
    );
}

export default Home;
