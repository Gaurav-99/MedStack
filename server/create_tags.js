const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tag = require('./src/models/Tag');

// Load env vars
dotenv.config({ path: './.env' });

const createTags = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        const medicalTags = [
            { name: 'Anatomy', description: 'Structure of the human body' },
            { name: 'Physiology', description: 'Functions and mechanisms of body systems' },
            { name: 'Biochemistry', description: 'Chemical processes in living organisms' },
            { name: 'Pharmacology', description: 'Drug actions and interactions' },
            { name: 'Pathology', description: 'Study of disease causes and effects' },
            { name: 'Microbiology', description: 'Bacteria, viruses, and microorganisms' },
            { name: 'Immunology', description: 'Immune system and responses' },
            { name: 'Cardiology', description: 'Heart and cardiovascular system' },
            { name: 'Neurology', description: 'Nervous system and brain disorders' },
            { name: 'Psychiatry', description: 'Mental health and disorders' },
            { name: 'Surgery', description: 'Surgical procedures and techniques' },
            { name: 'Pediatrics', description: 'Medical care of infants and children' },
            { name: 'Obstetrics', description: 'Pregnancy and childbirth' },
            { name: 'Gynecology', description: 'Female reproductive health' },
            { name: 'Oncology', description: 'Cancer diagnosis and treatment' },
            { name: 'Radiology', description: 'Medical imaging and diagnostics' },
            { name: 'Dermatology', description: 'Skin conditions and diseases' },
            { name: 'Ophthalmology', description: 'Eye and vision care' },
            { name: 'Orthopedics', description: 'Musculoskeletal system' },
            { name: 'Endocrinology', description: 'Hormones and glands' },
            { name: 'Gastroenterology', description: 'Digestive system disorders' },
            { name: 'Nephrology', description: 'Kidney diseases and treatment' },
            { name: 'Pulmonology', description: 'Respiratory system and lungs' },
            { name: 'Hematology', description: 'Blood disorders and diseases' },
            { name: 'Rheumatology', description: 'Autoimmune and joint diseases' },
            { name: 'Infectious-Disease', description: 'Contagious diseases and epidemics' },
            { name: 'Emergency-Medicine', description: 'Acute care and trauma' },
            { name: 'Anesthesiology', description: 'Pain management and sedation' },
            { name: 'Internal-Medicine', description: 'Adult disease prevention and treatment' },
            { name: 'Family-Medicine', description: 'Comprehensive primary care' },
            { name: 'Urology', description: 'Urinary tract and male reproductive system' },
            { name: 'ENT', description: 'Ear, nose, and throat conditions' },
            { name: 'Genetics', description: 'Heredity and genetic disorders' },
            { name: 'Clinical-Skills', description: 'Patient examination and procedures' },
            { name: 'Medical-Ethics', description: 'Ethical issues in healthcare' },
            { name: 'Public-Health', description: 'Community health and prevention' },
            { name: 'Epidemiology', description: 'Disease patterns and spread' },
            { name: 'Nutrition', description: 'Diet and nutritional health' },
            { name: 'Toxicology', description: 'Poisons and toxic substances' },
            { name: 'Forensic-Medicine', description: 'Medical aspects of law' },
            { name: 'Sports-Medicine', description: 'Athletic injuries and performance' },
            { name: 'Geriatrics', description: 'Healthcare for elderly patients' },
            { name: 'Palliative-Care', description: 'End-of-life and comfort care' },
            { name: 'Rehabilitation', description: 'Recovery and physical therapy' },
            { name: 'Medical-Research', description: 'Clinical trials and studies' },
            { name: 'Diagnostics', description: 'Disease identification methods' },
            { name: 'USMLE', description: 'United States Medical Licensing Exam' },
            { name: 'Clinical-Rotation', description: 'Medical student training' },
            { name: 'Case-Discussion', description: 'Patient case analysis' },
            { name: 'Study-Tips', description: 'Learning strategies for medical students' },
            { name: 'Cardiovascular', description: 'Relating to heart and blood vessels' },
            { name: 'Exercise', description: 'Physical activity and fitness' },
            { name: 'Neuroanatomy', description: 'Anatomy of the nervous system' },
            { name: 'Respiratory', description: 'Relating to breathing and lungs' },
            { name: 'Drugs', description: 'Medications and substances' },
            { name: 'Toxins', description: 'Poisonous substances' },
            { name: 'Enzymes', description: 'Biological catalysts' },
            { name: 'Kinetics', description: 'Rate of chemical reactions' }
        ];

        // Delete existing tags first to avoid duplicates
        await Tag.deleteMany({});
        console.log('Cleared existing tags...');

        // Create all tags
        for (const tagData of medicalTags) {
            await Tag.create(tagData);
            console.log(`Created tag: ${tagData.name}`);
        }

        console.log(`\n✅ Successfully created ${medicalTags.length} medical tags!`);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createTags();
