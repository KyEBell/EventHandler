import MainNavigation from '../components/MainNavigation';
import { useRouteError } from 'react-router-dom';
import PageContent from '../components/PageContent';

function ErrorPage() {
  const error = useRouteError();
  let title = 'An error occurred';
  let message = 'Something Went Wrong';

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = 'Not Found';
    message = 'could Not Find Resource Or Page';
  }
  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
