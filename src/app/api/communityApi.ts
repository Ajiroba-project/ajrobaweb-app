// src/api/communityApi.ts

import axios from 'axios';

const API_BASE_URL = 'https://ajiroba.onrender.com/v1/user';

// Function to get trending posts
export const getTrendingPosts = async (authToken: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/trending_posts/`, null, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    throw error;
  }
};

// Function to like a post
export const likePost = async (authToken: string, postId: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/like_post/`,
      { post_id: postId },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error liking the post:', error);
    throw error;
  }
};

// Function to dislike a post
export const dislikePost = async (authToken: string, postId: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/dislike_post/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        post_id: postId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error disliking the post:', error);
    throw error;
  }
};

// Function to comment on a post
export const commentOnPost = async (authToken: string, postId: string, comment: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/comment_on_post/`,
      {
        post_id: postId,
        comment: comment,
        comment_images: [""],
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error commenting on post:', error);
    throw error;
  }
};
