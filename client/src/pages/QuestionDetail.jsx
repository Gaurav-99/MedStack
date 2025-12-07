import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getQuestion, voteQuestion, reset, addAnswer, deleteQuestion, deleteAnswer } from '../features/questions/questionSlice';
import ReactMarkdown from 'react-markdown';
import { ThumbsUp, ThumbsDown, CheckCircle, Trash } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import { useState } from 'react';

function QuestionDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { question, isLoading, isError, message } = useSelector(
        (state) => state.questions
    );
    const { user } = useSelector((state) => state.auth);

    const [answerBody, setAnswerBody] = useState('');

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        dispatch(getQuestion(id));
    }, [isError, message, dispatch, id]);

    const onVote = (type) => {
        if (!user) return alert("Login to vote");
        dispatch(voteQuestion({ questionId: id, type }));
    };

    const onDeleteQuestion = () => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            dispatch(deleteQuestion(id));
            navigate('/');
        }
    };

    const onDeleteAnswer = (answerId) => {
        if (window.confirm('Are you sure you want to delete this answer?')) {
            dispatch(deleteAnswer({ questionId: id, answerId }));
        }
    };

    const onSubmitAnswer = (e) => {
        e.preventDefault();
        if (!user) return alert("Login to answer");
        dispatch(addAnswer({ questionId: id, answerData: { body: answerBody } }));
        setAnswerBody('');
    };

    if (isLoading || !question) {
        return <div className="text-center mt-10">Loading question...</div>;
    }

    return (
        <div className='container mx-auto px-4 max-w-4xl'>
            <div className="border-b pb-4 mb-6">
                <div className="flex justify-between">
                    <h1 className='text-2xl font-bold text-gray-900 mb-2'>{question.title}</h1>
                    <Link to="/ask" className="btn btn-primary bg-blue-600 text-white px-3 py-2 rounded h-fit text-sm">Ask Question</Link>
                </div>

                <div className="flex space-x-4 text-sm text-gray-500 items-center">
                    <span>Asked {formatDate(question.createdAt)}</span>
                    <span>Viewed {question.viewCount} times</span>
                    {user && question.author && user._id === question.author._id && (
                        <button
                            onClick={onDeleteQuestion}
                            className="flex items-center text-red-500 hover:text-red-700 font-medium"
                            title="Delete Question"
                        >
                            <Trash size={16} className="mr-1" />
                            Delete
                        </button>
                    )}
                </div>
            </div>

            <div className="flex gap-6">
                {/* Voting Column */}
                <div className="flex flex-col items-center space-y-4">
                    <button onClick={() => onVote('up')} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-orange-500">
                        <ThumbsUp size={24} />
                    </button>
                    <span className="font-bold text-xl text-gray-700">
                        {(question.votes?.up?.length || 0) - (question.votes?.down?.length || 0)}
                    </span>
                    <button onClick={() => onVote('down')} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-orange-500">
                        <ThumbsDown size={24} />
                    </button>
                </div>

                {/* Content Column */}
                <div className="flex-1">
                    <div className="prose max-w-none text-gray-800 mb-6">
                        <ReactMarkdown>{question.body}</ReactMarkdown>
                    </div>

                    <div className="flex justify-between items-end mb-8">
                        <div className="flex space-x-2">
                            {question.tags && question.tags.map(tag => (
                                <span key={tag._id || tag} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-sm">
                                    {tag.name || 'tag'}
                                </span>
                            ))}
                        </div>
                        <div className="bg-blue-50 p-3 rounded text-sm min-w-[200px]">
                            <span className="text-gray-500 block mb-1">asked {formatDate(question.createdAt)}</span>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 text-xs font-bold">
                                    {question.author?.name ? question.author.name[0] : 'U'}
                                </div>
                                <span className="text-blue-700 font-medium">{question.author?.name || 'User'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Answers Section */}
                    <div className="">
                        <h2 className="text-xl font-bold mb-4">{question.answers?.length || 0} Answers</h2>

                        {question.answers && question.answers.map(answer => (
                            <div key={answer._id} className="flex gap-4 border-t py-6">
                                <div className="flex flex-col items-center space-y-2">
                                    <button className="text-gray-400 hover:text-orange-500"><ThumbsUp size={18} /></button>
                                    <span className="font-bold text-gray-600">0</span>
                                    <button className="text-gray-400 hover:text-orange-500"><ThumbsDown size={18} /></button>
                                    {answer.isAccepted && <CheckCircle className="text-green-500 mt-2" size={24} />}
                                </div>
                                <div className="flex-1">
                                    <div className="prose text-gray-800 mb-4">
                                        <ReactMarkdown>{answer.body}</ReactMarkdown>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex space-x-2">
                                            {user && answer.author && user._id === answer.author._id && (
                                                <button
                                                    onClick={() => onDeleteAnswer(answer._id)}
                                                    className="flex items-center text-red-500 hover:text-red-700 text-sm font-medium"
                                                    title="Delete Answer"
                                                >
                                                    <Trash size={14} className="mr-1" />
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            answered {formatDate(answer.createdAt)} by <span className="text-blue-600">{answer.author?.name || 'User'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Post Answer */}
                    <div className="mt-8">
                        <h3 className="text-lg font-bold mb-4">Your Answer</h3>
                        <form onSubmit={onSubmitAnswer}>
                            <textarea
                                className="w-full border rounded-md p-4 min-h-[150px] focus:ring-2 focus:ring-blue-500 mb-4"
                                value={answerBody}
                                onChange={(e) => setAnswerBody(e.target.value)}
                                placeholder="Write your answer here (Markdown supported)..."
                                required
                            ></textarea>
                            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Post Answer</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionDetail;
