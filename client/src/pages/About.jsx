import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Activity, Heart } from 'lucide-react';

const About = () => {
    return (
        <div className="container mx-auto px-4 max-w-4xl py-10">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">About MedStack</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    The collaborative knowledge platform designed for the next generation of medical professionals.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4 text-blue-600">
                        <Users size={32} className="mr-3" />
                        <h3 className="text-xl font-bold text-gray-800">Community Driven</h3>
                    </div>
                    <p className="text-gray-600">
                        A peer-to-peer learning environment where medical students and professionals share insights, clinical experiences, and study strategies.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4 text-green-600">
                        <BookOpen size={32} className="mr-3" />
                        <h3 className="text-xl font-bold text-gray-800">Knowledge Base</h3>
                    </div>
                    <p className="text-gray-600">
                        Build a reliable repository of medical questions and answers, organized by specialty tags like Anatomy, Pharmacology, and Cardiology.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4 text-red-500">
                        <Heart size={32} className="mr-3" />
                        <h3 className="text-xl font-bold text-gray-800">For the Passionate</h3>
                    </div>
                    <p className="text-gray-600">
                        Whether you're prepping for USMLE, NEET PG, or just curious about a case, MedStack is your space to ask and learn.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4 text-purple-600">
                        <Activity size={32} className="mr-3" />
                        <h3 className="text-xl font-bold text-gray-800">Real-time collaboration</h3>
                    </div>
                    <p className="text-gray-600">
                        Get answers quickly from peers who are studying the same material or have faced similar clinical scenarios.
                    </p>
                </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Join the Community</h2>
                <p className="text-gray-600 mb-6">
                    Ready to start asking and answering?
                </p>
                <div className="space-x-4">
                    <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                        Sign Up Now
                    </Link>
                    <Link to="/" className="text-blue-600 font-medium hover:underline">
                        Explore Questions
                    </Link>
                </div>
            </div>

            <div className="mt-16 text-center text-sm text-gray-400">
                <p>MedStack is an open-source project.</p>
                <p>Built with React, Node.js, and MongoDB.</p>
            </div>
        </div>
    );
};

export default About;
