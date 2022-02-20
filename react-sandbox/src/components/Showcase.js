import MoviesList from "./MoviesList";

const Showcase = ({movieQueryResult}) => {
  return (
    <div id='showcase'>
      <MoviesList
          movieQueryResult={movieQueryResult}
      />
    </div>
  );
};

export default Showcase;
