import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"


const Blogs = ({ blogs }) => (
  <div>
    <h2>Blogs</h2>
    <ul>
      {blogs.map(blog =>
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.content}</Link>
        </li>
      )}
    </ul>
  </div>
)



export default Blogs