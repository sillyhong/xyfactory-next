// import React, { useMemo, lazy } from 'react';
// import { HashRouter, Router, Switch, Route, Link } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
// import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
// import { LinkContainer } from 'react-router-bootstrap';
// import Home from './Home';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import { routerConfig } from './constants';

// const Contactus = () => <span>Contactus</span>;
// const About = () => <span>about</span>;

// const routerConfigList = [
//   { Component: lazy(() => import('./Home')), path: '/' },
//   { Component: lazy(() => import('./AboutUs')), path: '/about-us' },
// ];

// const App = () => {
//   // const Routes = useMemo(() => {
//   //   return routerConfigList.map(({ Component, path }, index) => {
//   //     // console.log('path', path, 'Component', Component);
//   //     // console.log('path', path);
//   //     return (
//   //       <Route key={path + index} path={path}>
//   //         <Component />
//   //       </Route>
//   //     );
//   //   });
//   // }, []);

//   return (
//     <HashRouter>
//       <Switch>
//         {/* {Routes} */}
//         {/* <Route path="/about-us">
//           <About />
//         </Route>
//         <Route path="/contactus">
//           <Contactus />
//         </Route> */}
//         <Route path="/">
//           <Home />
//         </Route>
//       </Switch>
//       <Container className="p-3">
//         <Container className="p-5 mb-4 bg-light rounded-3">
//           <h1 className="header">Welcome To React-Bootstrap2</h1>
//           <h2>
//             <Switch>
//               <Route path="/about-us">
//                 <About />
//               </Route>
//               <Route path="/">
//                 <Home />
//               </Route>
//             </Switch>
//           </h2>
//           <h2>
//             Navigate to{' '}
//             <ButtonToolbar className="custom-btn-toolbar">
//               <LinkContainer to="/">
//                 <Button>Home</Button>
//               </LinkContainer>
//               <LinkContainer to="/about-us">
//                 <Button>About</Button>
//               </LinkContainer>
//               <LinkContainer to="/users">
//                 <Button>Users</Button>
//               </LinkContainer>
//             </ButtonToolbar>
//           </h2>
//         </Container>
//       </Container>
//     </HashRouter>
//   );
// };

// export default App;

import React from 'react';
import PageContainer from '../components/PageContainer';
import CarouselComp from './Carousel';
import ProductInfo from './ProductInfo';

import 'bootstrap/dist/css/bootstrap.min.css';
// import '../assets/css/fontawesome.css';

const HomeComp = () => {
  return (
    <>
      <CarouselComp />
      <ProductInfo />
    </>
  );
};

const HomePage = PageContainer(HomeComp);

const Home = () => {
  return <HomePage />;
};

export default Home;
