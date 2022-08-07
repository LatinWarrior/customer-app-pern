import { Route, Routes } from 'react-router-dom';
import { CustomerList } from './pages/customer-list/CustomerList';
import { Customer } from './pages/customer/Customer';
import { Home } from './pages/home/Home';
import { NotFound } from './pages/not-found/NotFound';

function App() {
    return (
        <main>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/customers' element={<CustomerList />} />
                <Route path='/customers/:id' element={<Customer />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </main>
    );
}

export default App;
