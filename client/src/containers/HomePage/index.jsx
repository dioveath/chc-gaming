import Navbar from  '../../components/Navbar';
import TopSection from '../HomePage/TopSection';
import Footer from '../../components/Footer';

import { PageContainer } from '../../layout/PageContainer';


export default function HomePage(){
  return <PageContainer>
           <Navbar/>
           <TopSection/>
           <Footer/>
         </PageContainer>;
}
