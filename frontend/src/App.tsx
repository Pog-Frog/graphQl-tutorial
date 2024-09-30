import { useState } from 'react';
import './App.css'
import { useQuery, useLazyQuery, gql, useMutation } from '@apollo/client';

function App() {

  const [movieQuery, setMovieQuery] = useState<string>('');

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [nationality, setNationality] = useState<string>('');

  const GET_USERS = gql`
    query {
      users {
        name
        id
        email
      }
    }
  `;

  const GET_MOVIES = gql`
    query {
      movies {
        id
        name
        year
      }
    }
  `

  const GET_MOVIE = gql`
    query {
      movie(name: "${movieQuery}") {
        id
        name
        year
      }
    }
  `

  const CREATE_USER_MUTATION = gql`
    mutation createUser($name: String!, $email: String!, $age: Int!, $nationality: Nationality!) {
      createUser(input: {name: $name, email: $email, age: $age, nationality: $nationality}) {
        name
        email
        age
      }
    }
  `

  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const { loading: movieLoading, error: movieError, data: movieData } = useQuery(GET_MOVIES);
  const [getMovie, { loading: movieLoading2, error: movieError2, data: movieData2 }] = useLazyQuery(GET_MOVIE);
  const [createUser, {data: userCreatedData}] = useMutation(CREATE_USER_MUTATION);

  return (
    <>
      <div>
        <div>
          <h1>
            Create a new user
          </h1>
          <input type='text' placeholder='Enter the name of the user'
            onChange={(e) => setName(e.target.value)}
          />
          <input type='email' placeholder='Enter the email of the user'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type='text' placeholder='Enter the age of the user'
            onChange={(e) => setAge(Number(e.target.value))}
          />
          <select
            onChange={(e) => setNationality(e.target.value)}
          >
            <option value={"American"}>American</option>
            <option value={"Chinese"}>Chinese</option>
            <option value={"Canadian"}>Canadian</option>
            <option value={"Pakistani"}>Pakistani</option>
            <option value={"Mexican"}>Mexican</option>
          </select>
          <button onClick={() => {
            createUser({ variables: { name, email, age, nationality } });
            refetch();
          }}
          >Create</button>

          {userCreatedData && (
            <div>
              <h3>{userCreatedData?.createUser?.name}</h3>
              <p>{userCreatedData?.createUser?.email}</p>
              <p>{userCreatedData?.createUser?.age}</p>
            </div>
          )}
        </div>

        <h1 style={{ textAlign: "center" }}>
          List of all the users
        </h1>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}

        {data && (
          <div>
            {data.users.map((user: any) => (
              <div key={user.id}>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
            ))}
          </div>
        )}

        <h1 style={{ textAlign: "center" }}>
          List of all the movies
        </h1>

        {movieLoading && <p>Loading...</p>}
        {movieError && <p>Error: {movieError.message}</p>}
        {movieData && (
          <div>
            {movieData.movies.map((movie: any) => (
              <div key={movie.id}>
                <h3>{movie.name}</h3>
                <p>{movie.year}</p>
              </div>
            ))}
          </div>
        )}

        <div>
          <input type='text' placeholder='Enter the name of the movie'
            onChange={(e) => setMovieQuery(e.target.value)}
          />
          <button onClick={() => getMovie({ variables: { name: movieQuery } })}>Search</button>
        </div>

        {movieLoading2 && <p>Loading...</p>}
        {movieError2 && <p>Error: {movieError2.message}</p>}
        {movieData2 && (
          <div>
            <h3>{movieData2.movie?.name}</h3>
            <p>{movieData2.movie?.year}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default App
