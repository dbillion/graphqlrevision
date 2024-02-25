const {courses,genres}=require("../database");
exports.Query={
   
    courses: (parent, args, context) => {
        // const courses = context.courses;
        // return courses;
let filteredCourses = context.courses;
let { reviews } = context;
 const { filter } = args;
 if(filter){
    const { discount, avgRating } = filter;
    if(discount) filteredCourses = filteredCourses.
   filter(product => product.discount);
    if([1, 2, 3, 4, 5].includes(avgRating)){
    filteredCourses = filteredCourses.
   filter(item => {
    let sum = 0;
    let numOfReviews = 0;
    reviews.forEach((review) => {
    if(review.courseId === item.id){
    sum += review.rating;
    numOfReviews++;
    }
    })
    const avgCourseRating = sum / numOfReviews;
    return avgCourseRating >= avgRating;
    })
    }
    }
  
    return filteredCourses;
    },

    course: (parent, args, context) => {
        const courseId = args.id;
        const courses = context.courses;
        const course = courses.find(item => item.id === 
        courseId);
        if(!course) return null;
        else return course;
        },
    genres: (parent, args, context) => {
    const genres = context.genres;
    return genres;
    },
    genre: (parent, args, context) => {
    const catId = args.id;
    const genres = context.genres;
    const genre = genres.find(item => item.id === catId);
    if(!genre) return null;
    else return genre;
    },
}