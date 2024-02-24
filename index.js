const { ApolloServer, gql } = require("apollo-server");
const { getArgumentValues } = require("graphql");
// 
const kourses = [
    {
    id: "book-06",
    name: "TypeScript Basics",
    description: "TypeScript Basics for beginners",
    price: 599.99,
    discount: false
    },
    {
    id: "book-07",
    name: "GraphQL Basics",
    description: "GraphQL Basics for beginners",
    price: 499.99,
    discount: true
    },
    {
    id: "book-08",
    name: "NextJS Basics",
    description: "NextJS Basics for beginners",
    price: 599.99,
    discount: false
    }
   ]

  const courses=[
    {
        id: "book-08",
        name: "NextJS Basics",
        description: "NextJS Basics for beginners",
        price: 599.99,
        discount: false,
        genreId: "cat-01"
        },
    ,{
 id: "book-21",
 name: "The Immortals of Meluha",
 description: "Shiva Trilogy -1",
 price: 299.99,
 discount: false,
 genreId: "cat-02"
 },
 {
 id: "book-22",
 name: "The Secret of the Nagas",
 description: "Shiva Trilogy -2",
 price: 199.99,
 discount: true,
 genreId: "cat-02"
 },
 {
 id: "book-23",
 name: "The Oath of the Vayuputras",
 description: "Shiva Trilogy -3",
 price: 599.99,
 discount: false,
 genreId: "cat-02"
 }
   ]

const allCourses =[
    {
    name: "TypeScript Basics",
    description: "TypeScript Basics for beginners",
 price: 599.99,
 discount: false
},
{
    name: "GraphQL Basics",
    description: "GraphQL Basics for beginners",
    price: 499.99,
    discount: true
    },
    {
    name: "NextJS Basics",
    description: "NextJS Basics for beginners",
    price: 599.99,
    discount: false
    }
]

const genres = [
    { id: 'cat-01', name: 'Technical' },
    { id: 'cat-02', name: 'History' }
   ]


const typeDefs = gql`

 type Query {
     lectures: [String!]!,
     courses:[Course!]!
    course(id: ID!): Course
    genres:[Genre!]!
    genre(id: ID!): Genre
    welcome: String!
 numOfCourses: Int
 price: Float
 isTrainer: Boolean
 }


 type Course {
 name: String!
 description: String!
 price: Float!
 discount: Boolean!
 genre: Genre
 }

 type Genre{
 id: ID!
 name: String!
 courses: [Course!]!
 }
`

const resolvers = {
    Query: 
    {
        // courses: () => {
        // // return allCourses
        // because its return a single getArgumentValues, 
        // we can replace it with this : courses: () => courses,
        // return courses
        // },
        courses: () => courses,  // returns all objects
        // filtering through an object
        course: (parent, args, context) => { //create 3 args
            const courseId = args.id; // assigns id to one args
            const course = courses.find(item => item.id === courseId); // checks if args equals id selected
            if(!course) return null; // retruns nulls if it doesnt exist
            else return course; // returns the matched item
            },
        //    

        genres:()=>genres,

        genre:(parent,args,context)=>{
            const catId = args.id;
            const genre = genres.find(item => item.id 
           === catId);
if(!genre)return null;
return genre
        },
        lectures: () => {
            return ['TypeScript', 'GraphQL', 'NextJS','Angular']
            },
    welcome: () => {
    return  "Weclome to the World of GraphQL"
    },
    numOfCourses: () => {
    return 12;
    },
    price: () => {
        return 1465.98;
        },
        isTrainer: () => {
        return true;
        }
    }
   }
   const server = new ApolloServer({ typeDefs, resolvers })
   server.listen().then(({ url}) => console.log(`Server is running 
   at ${url}`));