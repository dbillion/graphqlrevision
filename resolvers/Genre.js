
exports.Genre={
           courses: (parent, args, context) => {
            const courses = context.courses;
 const genreId = parent.id;
 const { filter } = args;
 const genreProducts = courses.filter(item => item.
genreId === genreId);
 let filteredGenre = genreProducts;
 if(filter){
 if(filter.discount){
 filteredGenre = filteredGenre.filter(product => 
product.discount);
 }
 }
 return filteredGenre;    }

}