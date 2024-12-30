import { Comment } from "../../types/BookDetails";
import './BookComment.css';
export default function BookComment({ bookComment }: { bookComment: Comment }) {
  return (
    <div className="book-comment">
      <div className="comment-header">
        <span className="comment-user">
          {bookComment.commentUserDto.firstName} {bookComment.commentUserDto.lastName}
        </span>
        <span className="comment-date">{bookComment.createdAt}</span>
      </div>
      <div className="comment-body">
        <p>{bookComment.comment}</p>
      </div>
    </div>
  );
}
