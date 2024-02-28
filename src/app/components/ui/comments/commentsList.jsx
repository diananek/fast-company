import React, { useEffect, useState } from "react";
import CommentForm from "../commentForm";
import Comment from "./comment";
import api from "../../../api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { orderBy } from "lodash";
const CommentsList = () => {
  const [comments, setComments] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  }, []);

  const onSubmit = (data) => {
    api.comments
      .add({ ...data, pageId: userId })
      .then((data) => setComments([...comments, data]));
  };

  const onDelete = (id) => {
    api.comments.remove(id).then((id) => {
      setComments(
        comments.filter((comment) => {
          return comment._id !== id;
        })
      );
    });
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <h2>New comment</h2>
          <CommentForm onSubmit={onSubmit} />
        </div>
      </div>
      {comments.length !== 0 ? (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {sortedComments.map((comment) => (
              <Comment
                id={comment._id}
                userId={comment.userId}
                content={comment.content}
                time={comment.created_at}
                key={comment._id}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
};

export default CommentsList;
