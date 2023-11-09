import MainNavigation from '../components/MainNavigation';

function ErrorPage() {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>ERROR HAS OCCURRED</h1>
        <p>Requested Page does not exist</p>
      </main>
    </>
  );
}

export default ErrorPage;
