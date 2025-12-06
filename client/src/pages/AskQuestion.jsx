import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createQuestion } from '../features/questions/questionSlice';
import tagService from '../services/tagService';
import { X } from 'lucide-react';

function AskQuestion() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [showTagSuggestions, setShowTagSuggestions] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError, message } = useSelector(
        (state) => state.questions
    );

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await tagService.getTags();
                setAvailableTags(response.data || []);
            } catch (error) {
                console.error('Failed to fetch tags:', error);
            }
        };
        fetchTags();
    }, []);

    const filteredTags = availableTags.filter(tag =>
        tag.name.toLowerCase().includes(tagInput.toLowerCase()) &&
        !selectedTags.find(st => st._id === tag._id)
    );

    const addTag = (tag) => {
        if (selectedTags.length < 5 && !selectedTags.find(t => t._id === tag._id)) {
            setSelectedTags([...selectedTags, tag]);
            setTagInput('');
            setShowTagSuggestions(false);
        }
    };

    const removeTag = (tagId) => {
        setSelectedTags(selectedTags.filter(t => t._id !== tagId));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            alert("You must be logged in");
            navigate('/login');
            return;
        }

        // Basic PII regex warning
        const piiRegex = /\b(\d{3}-\d{2}-\d{4}|[A-Z][a-z]+ [A-Z][a-z]+)\b/;
        if (piiRegex.test(body)) {
            if (!window.confirm("Systems detected potential PII (names/numbers). Please confirm you have removed patient data.")) {
                return;
            }
        }

        const tagIds = selectedTags.map(tag => tag._id);
        dispatch(createQuestion({ title, body, tags: tagIds }));
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

                {/* Tag Selection */}
                <div>
                    <label htmlFor='tags' className='block font-bold text-gray-700 mb-2'>Tags</label>
                    <p className="text-xs text-gray-500 mb-2">Add up to 5 tags to describe what your question is about.</p>

                    {/* Selected Tags */}
                    <div className="flex flex-wrap gap-2 mb-2">
                        {selectedTags.map(tag => (
                            <span key={tag._id} className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                {tag.name}
                                <button type="button" onClick={() => removeTag(tag._id)} className="hover:text-blue-900">
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                    </div>

                    {/* Tag Input */}
                    {selectedTags.length < 5 && (
                        <div className="relative">
                            <input
                                type='text'
                                value={tagInput}
                                onChange={(e) => {
                                    setTagInput(e.target.value);
                                    setShowTagSuggestions(true);
                                }}
                                onFocus={() => setShowTagSuggestions(true)}
                                className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500'
                                placeholder='Search tags...'
                            />

                            {/* Tag Suggestions */}
                            {showTagSuggestions && tagInput && filteredTags.length > 0 && (
                                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                                    {filteredTags.slice(0, 10).map(tag => (
                                        <button
                                            key={tag._id}
                                            type="button"
                                            onClick={() => addTag(tag)}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-start"
                                        >
                                            <div>
                                                <div className="font-medium text-gray-900">{tag.name}</div>
                                                {tag.description && (
                                                    <div className="text-xs text-gray-500">{tag.description}</div>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
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
