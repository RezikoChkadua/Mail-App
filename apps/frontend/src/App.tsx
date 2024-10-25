import { Layout } from 'components';
import { EmailPage, RecipientsPage } from 'pages';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from 'store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/*" element={<EmailPage />} />
            <Route path="/recipients" element={<RecipientsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
