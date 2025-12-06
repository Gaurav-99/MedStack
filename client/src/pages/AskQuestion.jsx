import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createQuestion } from '../features/questions/questionSlice';
// import ReactMarkdown from 'react-markdown'; // If we want preview

function AskQuestion() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState(''); // Comma separated for MVP

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError, message } = useSelector(
        (state) => state.questions
    );

    const { user } = useSelector((state) => state.auth);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            alert("You must be logged in");
            navigate('/login');
            return;
        }

        // Basic PII regex warning (mock)
        const piiRegex = /\b(\d{3}-\d{2}-\d{4}|[A-Z][a-z]+ [A-Z][a-z]+)\b/; // SSN or Name-like
        if (piiRegex.test(body)) {
            if (!window.confirm("Systems detected potential PII (names/numbers). Please confirm you have removed patient data.")) {
                return;
            }
        }

        // Mock tag: just sending empty array or TODO
        // I will just send tags empty or implement splitting if backend handles string
        // My backend schema expects Tag ObjectIDs. 
        // For MVP, I will skip tag ID lookup and rely on loose backend or just send empty.
        // Or simpler: Create default tag in seed and use it.
        // I'll leave tags empty for now to avoid ID cast errors in backend, or fix backend to allow creating tags.

        dispatch(createQuestion({ title, body }));
        navigate('/');
    };

    if (isLoading) {
        return <div>Submitting...</div>;
    }

    return (
        <div className='container mx-auto px-4 max-w-3xl'>
            <h1 className='text-3xl font-bold mb-6'>Ask a Question</h1>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p className="text-sm text-blue-700">
                    <strong>Note:</strong> Ensure your question is educational. Do not post patient-specific advice or identifiable information (PII).
                </p>
            </div>

            <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-sm border space-y-6">
                <div>
                    <label htmlFor='title' className='block font-bold text-gray-700 mb-2'>Title</label>
                    <p className="text-xs text-gray-500 mb-2">Be specific and imagine you’re asking a question to another person.</p>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500'
                        placeholder='e.g. Is there an R-R interval variation in ...'
                        required
                    />
                </div>

                <div>
                    <label htmlFor='body' className='block font-bold text-gray-700 mb-2'>Body</label>
                    <p className="text-xs text-gray-500 mb-2">Include all the information someone would need to answer your question. Markdown supported.</p>
                    <textarea
                        id='body'
                        name='body'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className='w-full px-4 py-2 border rounded-md h-64 focus:ring-2 focus:ring-blue-500 font-mono text-sm'
                        placeholder='Describe your case or question...'
                        required
                    ></textarea>
                </div>

                {/* Tag input placeholder */}
                <div>
                    <label htmlFor='tags' className='block font-bold text-gray-700 mb-2'>Tags</label>
                    <p className="text-xs text-gray-500 mb-2">Add up to 5 tags to describe what your question is about (comma separated).</p>
                    <input
                        type='text'
                        id='tags'
                        name='tags'
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500'
                        placeholder='e.g. cardiology, pharmacology'
                        disabled={true} // Disabled for MVP to avoid ObjectId errors
                    />
                    <span className="text-xs text-red-400">Tagging temporarily disabled in MVP.</span>
                </div>

                <div className="flex items-center space-x-2">
                    <input type="checkbox" required id="disclaimer" className="h-4 w-4 text-blue-600" />
                    <label htmlFor="disclaimer" className="text-sm text-gray-600">
                        I confirm this post contains no Personally Identifiable Information (PII).
                    </label>
                </div>

                <button type='submit' className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition'>
                    Post Your Question
                </button>
            </form>
        </div>
    );
}

export default AskQuestion;
