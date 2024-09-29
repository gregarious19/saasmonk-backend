import { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";
import { publicProcedure, createContext, router } from "./trpc";

const prisma = new PrismaClient();

const createUser = async () => {};

export const appRouter = router({
  addMovie: publicProcedure
    .input(
      z.object({
        name: z.string(),
        releaseDate: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      let movie: Prisma.MovieCreateInput;
      movie = {
        name: input.name,
        releaseDate: input.releaseDate,
      };
      const createMovie = await prisma.movie.create({ data: movie });
    }),
  deleteMovie: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const deleteMovie = await prisma.movie.delete({
        where: { id: input.id },
      });
    }),
  getAllMovies: publicProcedure.query(async () => {
    // Fetch all movies from the database
    const movies = await prisma.movie.findMany({});

    return movies; // Return the list of movies
  }),
  addReview: publicProcedure
    .input(
      z.object({
        name: z.string(),
        rating: z.number(),
        comment: z.string(),
        movieId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      let review: Prisma.ReviewCreateInput;
      review = {
        reviewerName: input.name,
        rating: input.rating,
        comments: input.comment,
        movie_id: { connect: { id: input.movieId } },
      };
      const createMovie = await prisma.review.create({ data: review });
    }),
  deleteReview: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const deleteReview = await prisma.review.delete({
        where: { id: input.id },
      });
    }),
  updateReview: publicProcedure
    .input(
      z.object({
        reviewId: z.number(), // The ID of the review to update
        rating: z.number().min(0).max(10), // Rating should be between 0 and 10
        comments: z.string().max(255), // Comments can be a string with max length
      })
    )
    .mutation(async ({ input }) => {
      const { reviewId, rating, comments } = input;

      // Update the review in the database
      const updatedReview = await prisma.review.update({
        where: { id: reviewId },
        data: {
          rating,
          comments,
        },
      });
    }),
  getReviewsForMovie: publicProcedure
    .input(
      z.object({
        movieId: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { movieId } = input;

      // Fetch all reviews for the specified movie
      const reviews = await prisma.review.findMany({
        where: {
          movieId: movieId, // Filter reviews by movie ID
        },
      });

      return reviews; // Return the list of reviews
    }),
});
