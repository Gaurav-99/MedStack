const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

// Load models
const User = require('./src/models/User');
const Question = require('./src/models/Question');
const Answer = require('./src/models/Answer');
const Tag = require('./src/models/Tag');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Import into DB
const importData = async () => {
    try {
        await User.deleteMany();
        await Question.deleteMany();
        await Answer.deleteMany();
        await Tag.deleteMany();

        console.log('Data Destroyed...');

        // ------------------------
        // 1. Create Users
        // ------------------------
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash('password123', salt); // Common password

        const usersData = [
            {
                name: 'Alice Student',
                email: 'alice@med.edu',
                password: password,
                school: 'Harvard Medical School',
                year: 'Year 1',
                role: 'student',
                bio: 'Passionate about internal medicine.'
            },
            {
                name: 'Bob Resident',
                email: 'bob@resident.org',
                password: password,
                school: 'Johns Hopkins',
                year: 'PGY-2',
                role: 'student',
                bio: 'Surgical resident.'
            },
            {
                name: 'Dr. Gregory House',
                email: 'house@princeton.com',
                password: password,
                school: 'Princeton-Plainsboro',
                year: 'Attending',
                role: 'moderator',
                bio: 'It is never lupus.',
                reputation: 100
            },
            {
                name: 'Sarah Nurse',
                email: 'sarah@care.org',
                password: password,
                school: 'Nursing Academy',
                year: 'Senior',
                role: 'student',
                bio: 'Helping patients every day.'
            },
            {
                name: 'Admin User',
                email: 'admin@medstack.com',
                password: password,
                school: 'MedStack HQ',
                year: 'Admin',
                role: 'admin',
                bio: 'System Administrator.'
            },
            // Keeping original examples too just in case
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: password,
                role: 'student',
                school: 'Harvard Med',
                year: 'MS3'
            }
        ];

        const users = await User.create(usersData);
        console.log(`Created ${users.length} Users...`);

        // ------------------------
        // 2. Create Tags
        // ------------------------
        const medicalTags = [
            { name: 'anatomy', description: 'Structure of the human body' },
            { name: 'physiology', description: 'Functions and mechanisms of body systems' },
            { name: 'biochemistry', description: 'Chemical processes in living organisms' },
            { name: 'pharmacology', description: 'Drug actions and interactions' },
            { name: 'pathology', description: 'Study of disease causes and effects' },
            { name: 'microbiology', description: 'Bacteria, viruses, and microorganisms' },
            { name: 'immunology', description: 'Immune system and responses' },
            { name: 'cardiology', description: 'Heart and cardiovascular system' },
            { name: 'neurology', description: 'Nervous system and brain disorders' },
            { name: 'psychiatry', description: 'Mental health and disorders' },
            { name: 'surgery', description: 'Surgical procedures and techniques' },
            { name: 'pediatrics', description: 'Medical care of infants and children' },
            { name: 'obstetrics', description: 'Pregnancy and childbirth' },
            { name: 'gynecology', description: 'Female reproductive health' },
            { name: 'oncology', description: 'Cancer diagnosis and treatment' },
            { name: 'radiology', description: 'Medical imaging and diagnostics' },
            { name: 'dermatology', description: 'Skin conditions and diseases' },
            { name: 'ophthalmology', description: 'Eye and vision care' },
            { name: 'orthopedics', description: 'Musculoskeletal system' },
            { name: 'endocrinology', description: 'Hormones and glands' },
            { name: 'gastroenterology', description: 'Digestive system disorders' },
            { name: 'nephrology', description: 'Kidney diseases and treatment' },
            { name: 'pulmonology', description: 'Respiratory system and lungs' },
            { name: 'hematology', description: 'Blood disorders and diseases' },
            { name: 'rheumatology', description: 'Autoimmune and joint diseases' },
            { name: 'infectious-disease', description: 'Contagious diseases and epidemics' },
            { name: 'emergency-medicine', description: 'Acute care and trauma' },
            { name: 'anesthesiology', description: 'Pain management and sedation' },
            { name: 'internal-medicine', description: 'Adult disease prevention and treatment' },
            { name: 'family-medicine', description: 'Comprehensive primary care' },
            { name: 'urology', description: 'Urinary tract and male reproductive system' },
            { name: 'ent', description: 'Ear, nose, and throat conditions' },
            { name: 'genetics', description: 'Heredity and genetic disorders' },
            { name: 'clinical-skills', description: 'Patient examination and procedures' },
            { name: 'medical-ethics', description: 'Ethical issues in healthcare' },
            { name: 'public-health', description: 'Community health and prevention' },
            { name: 'epidemiology', description: 'Disease patterns and spread' },
            { name: 'nutrition', description: 'Diet and nutritional health' },
            { name: 'toxicology', description: 'Poisons and toxic substances' },
            { name: 'forensic-medicine', description: 'Medical aspects of law' },
            { name: 'sports-medicine', description: 'Athletic injuries and performance' },
            { name: 'geriatrics', description: 'Healthcare for elderly patients' },
            { name: 'palliative-care', description: 'End-of-life and comfort care' },
            { name: 'rehabilitation', description: 'Recovery and physical therapy' },
            { name: 'medical-research', description: 'Clinical trials and studies' },
            { name: 'diagnostics', description: 'Disease identification methods' },
            { name: 'usmle', description: 'United States Medical Licensing Exam' },
            { name: 'clinical-rotation', description: 'Medical student training' },
            { name: 'case-discussion', description: 'Patient case analysis' },
            { name: 'study-tips', description: 'Learning strategies for medical students' },
            { name: 'neuroanatomy', description: 'Anatomy of the nervous system' },
            { name: 'respiratory', description: 'Relating to breathing and lungs' },
            { name: 'drugs', description: 'Medications and substances' },
            { name: 'toxins', description: 'Poisonous substances' },
            { name: 'enzymes', description: 'Biological catalysts' },
            { name: 'kinetics', description: 'Rate of chemical reactions' },
            // Extra ones from prompt
            { name: 'cell-biology', description: 'Study of cell structure and function' },
            { name: 'clinical', description: 'Direct observation and treatment of patients' }
        ];

        // Lowercase all tag names for consistency/lookup
        medicalTags.forEach(t => t.name = t.name.toLowerCase());

        const tags = await Tag.create(medicalTags);
        console.log(`Created ${tags.length} Tags...`);

        // Helper to find tag Ids
        const getTagIds = (tagNames) => {
            return tagNames.map(name => {
                const found = tags.find(t => t.name === name.toLowerCase());
                if (!found) console.warn(`Tag not found: ${name}`);
                return found ? found._id : null;
            }).filter(id => id !== null);
        };

        // Helper to get random user
        const getRandomUser = () => users[Math.floor(Math.random() * users.length)];

        // ------------------------
        // 3. Create Questions
        // ------------------------
        const questionsData = [
            {
                title: 'Why does radial nerve injury at the mid-shaft of the humerus spare elbow extension?',
                body: 'In fractures of the humeral shaft, patients commonly present with wrist drop due to radial nerve damage.\nHowever, elbow extension is usually preserved.\nWhat anatomical reason explains this exception?',
                tags: ['anatomy', 'neuroanatomy', 'orthopedics']
            },
            {
                title: 'Why is propranolol contraindicated in patients with asthma?',
                body: 'Propranolol is a non-selective beta-blocker.\nI understand it acts on both β1 and β2 receptors, but can someone explain exactly how β2 blockade leads to asthma exacerbation?',
                tags: ['pharmacology', 'respiratory', 'drugs']
            },
            {
                title: 'What causes the heat-stable toxin effect in Staphylococcus aureus food poisoning?',
                body: 'S. aureus food poisoning causes rapid symptoms even if food is reheated.\nWhich toxin is responsible, and why does heating fail to neutralize it?',
                tags: ['microbiology', 'infectious-disease', 'toxins']
            },
            {
                title: 'How does chronic hypertension lead to concentric left ventricular hypertrophy?',
                body: 'I know that long-term high blood pressure increases afterload, but I’m unclear on how this results in parallel sarcomere addition and wall thickening.\nCan someone explain the physiological adaptation mechanism?',
                tags: ['pathology', 'cardiology', 'physiology']
            },
            {
                title: 'Why does competitive inhibition increase Km but leave Vmax unchanged?',
                body: 'In enzyme kinetics, competitive inhibitors shift the curve to the right.\nWhy exactly is Km increased, and why is Vmax unaffected even though the reactions slow down?',
                tags: ['biochemistry', 'enzymes', 'kinetics']
            },
            {
                title: 'Why does Mycobacterium tuberculosis not stain with the Gram stain?',
                body: 'Most bacteria can be classified as Gram-positive or Gram-negative.\nM. tuberculosis doesn\'t stain well with either method.\nWhat structure in its cell wall makes it acid-fast instead?',
                tags: ['microbiology', 'pathology', 'cell-biology']
            },
            {
                title: 'What is the physiological mechanism behind vasovagal syncope?',
                body: 'A 22-year-old medical student faints during a blood draw.\nWhy does sudden vagal stimulation lead to such a dramatic drop in blood pressure and heart rate?',
                tags: ['physiology', 'neurology', 'clinical']
            },
            {
                title: 'Why does COPD lead to secondary polycythemia?',
                body: 'Patients with chronic COPD often have elevated hemoglobin levels.\nHow does chronic hypoxemia result in increased erythropoietin and RBC production?',
                tags: ['pathology', 'respiratory', 'hematology']
            },
            {
                title: 'Why does a lesion in the optic chiasm cause bitemporal hemianopia?',
                body: 'I understand the basic visual pathways, but I’m confused how a pituitary tumor pressing on the optic chiasm specifically affects peripheral visual fields.',
                tags: ['neuroanatomy', 'ophthalmology', 'neurology']
            }
        ];

        const questionsToCreate = questionsData.map(q => ({
            title: q.title,
            body: q.body,
            tags: getTagIds(q.tags),
            author: getRandomUser()._id,
            viewCount: Math.floor(Math.random() * 50)
        }));

        const questions = await Question.create(questionsToCreate);
        console.log(`Created ${questions.length} Questions...`);

        // ------------------------
        // 4. Create Answers (Optional but good for completeness)
        // ------------------------
        // Add one example answer to the first question
        await Answer.create({
            body: 'The radial nerve gives off branches to the triceps brachii (responsible for extension) *before* it enters the radial groove of the humerus. Therefore, a mid-shaft fracture affects the nerve distally to these branches, sparing the triceps and thus elbow extension.',
            question: questions[0]._id, // Radial nerve question
            author: getRandomUser()._id
        });

        console.log('Sample Answer Created...');

        console.log('Data Imported!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await User.deleteMany();
        await Question.deleteMany();
        await Answer.deleteMany();
        await Tag.deleteMany();

        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    deleteData();
} else {
    importData();
}
