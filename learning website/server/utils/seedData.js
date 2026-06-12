const Course = require('../models/Course');
const Quiz = require('../models/Quiz');

const courses = [
  {
    title: 'Introduction to Web Development',
    description: 'Learn HTML, CSS, and JavaScript with interactive lessons.',
    lessons: [
      { title: 'HTML Basics', content: 'Learn how to structure web pages using HTML.' },
      { title: 'CSS Fundamentals', content: 'Style your pages with CSS selectors, layouts, and colors.' },
      { title: 'JavaScript Introduction', content: 'Explore JavaScript fundamentals and DOM interactions.' },
    ],
  },
  {
    title: 'JavaScript Essentials',
    description: 'Build dynamic user experiences using core JavaScript concepts.',
    lessons: [
      { title: 'Variables and Data', content: 'Manage values using variables and basic data types.' },
      { title: 'Functions and Loops', content: 'Write reusable logic and process collections.' },
      { title: 'Browser Events', content: 'React to user interactions with event handlers.' },
    ],
  },
];

const quizzes = [
  {
    questions: [
      {
        question: 'Which HTML element contains the main heading?',
        options: ['<main>', '<h1>', '<section>', '<header>'],
        answer: '<h1>',
      },
      {
        question: 'Which CSS property changes text color?',
        options: ['margin', 'color', 'border', 'background'],
        answer: 'color',
      },
      {
        question: 'How do you print a message to the console?',
        options: ['console.log()', 'alert()', 'print()', 'document.write()'],
        answer: 'console.log()',
      },
    ],
  },
  {
    questions: [
      {
        question: 'Which keyword declares a variable in JavaScript?',
        options: ['let', 'var', 'const', 'all of the above'],
        answer: 'all of the above',
      },
      {
        question: 'What is an array?',
        options: ['A number', 'A function', 'A list of values', 'A boolean'],
        answer: 'A list of values',
      },
      {
        question: 'What event fires when a user clicks a button?',
        options: ['onClick', 'click', 'onclick', 'buttonclick'],
        answer: 'click',
      },
    ],
  },
];

const seedData = async () => {
  try {
    const coursesCount = await Course.countDocuments();
    if (coursesCount === 0) {
      const createdCourses = await Course.insertMany(courses);
      const quizzesToCreate = createdCourses.map((course, index) => ({
        course: course._id,
        questions: quizzes[index].questions,
      }));
      await Quiz.insertMany(quizzesToCreate);
      console.log('Seed data created');
    }
  } catch (error) {
    console.error('Seed data failed:', error.message);
  }
};

module.exports = seedData;
