import { Navbar, MenuItem, NavDropdown, Nav, NavItem } from 'react-bootstrap';
import * as React from 'react';
import circlr from 'circlr';
import 'jquery';


import image1 from './images/01.jpg';
import image2 from './images/02.jpg';
import image3 from './images/03.jpg';
import image4 from './images/04.jpg';
import headerLogo from './header-logo.png';


//declare var circlr: any;
interface AppProps {

}
interface AppState {
    activeID: number,

}

class App extends React.Component<AppProps, AppState> {

    constructor(props) {
        super(props);
        this.state = {
            activeID: 1,

        };
    }

    private bongImages = document.querySelector('.image-container');
    private nextButton: HTMLButtonElement;
    private previousButton: HTMLButtonElement;
    private playButton: HTMLButtonElement;

    // idunno:
    private circlrCamera: circlr;



    //private

    componentDidMount() {
/*                this.setState({

                });*/

/*                this.circlrCamera(this.bongImages)
                    .scroll(true)
                    .play()
                    .on('show', n => {

                });*/

                //'use strict';
                // eslint-disable-next-line
/*                var _circlr: any = circlr;

                // eslint-disable-next-line
                var _circlr2: any = _interopRequireDefault(_circlr);
                // eslint-disable-next-line
                function _interopRequireDefault(obj) { return obj; }
                // eslint-disable-next-line
                var el = document.querySelector('.drewfis-labs');
                // eslint-disable-next-line
                var btnScroll = document.querySelector('.btn-scroll');
                // eslint-disable-next-line
                var btnCycle = document.querySelector('.btn-cycle');
                // eslint-disable-next-line
                var btnReverse = document.querySelector('.btn-reverse');
                // eslint-disable-next-line
                var btnPrev = document.querySelector('.btn-prev');
                // eslint-disable-next-line
                var btnNext = document.querySelector('.btn-next');
                // eslint-disable-next-line
                var btnPlay = document.querySelector('.btn-play');
                // eslint-disable-next-line
                var btnPlayTo = document.querySelector('.btn-play-to');
                // eslint-disable-next-line
                var camera = (_circlr2)(el).scroll(true);

                btnScroll.addEventListener('click', function (e) {
                    toggleActive(e.target);
                    camera.scroll(isActive(e.target));
                }, false);

                btnCycle.addEventListener('click', function (e) {
                    toggleActive(e.target);
                    camera.cycle(isActive(e.target));
                }, false);

                btnReverse.addEventListener('click', function (e) {
                    toggleActive(e.target);
                    camera.reverse(isActive(e.target));
                }, false);

                btnPrev.addEventListener('click', function () {
                    camera.prev();
                }, false);

                btnNext.addEventListener('click', function () {
                    camera.next();
                }, false);


                btnPlay.addEventListener('click', function (e) {
                    let fuckYou: any = e;

                    if (fuckYou.target.innerHTML === 'Play') {
                        camera.play();
                        fuckYou.target.innerHTML = 'Stop';
                    } else {
                        camera.stop();
                        fuckYou.target.innerHTML = 'Play';
                    }
                }, false);

                btnPlayTo.addEventListener('click', function () {
                    camera.play(0);
                }, false);

                function toggleActive(el) {
                    if (isActive(el)) {
                        el.className = el.className.replace(/(active)/, '');
                    } else {
                        el.className += ' active';
                    }
                }

                function isActive(el) {
                    return el.className.includes('active');
                }*/


    }



    toggleActive = (newActiveID: number) => {
        this.setState({
            activeID: newActiveID
        });
    };

    isActive = () => {
        // this can be done inline w react elements


    };

    handleNextClick = () => {
        let test = this.state.activeID + 1;
        this.setState({
            activeID: test
        });
    };


    handlePrevClick = () => {
        let test = this.state.activeID - 1;
        this.setState({
            activeID: test
        });
    };


  public render() {
    return (
        <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">
                            <img src={headerLogo} className="app-header-logo" alt="logo" height={25}/>
                        </a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#">
                        Preconfigured
                    </NavItem>
                    <NavItem eventKey={2} href="#">
                        Build your own
                    </NavItem>
                </Nav>
            </Navbar>


            <div className="container text-center">
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12">
                        <div className="drewfis-labs image-container" style={{ width: "100%" }}/>
                        <div>
                            <img src={image1} className={this.state.activeID == 1 ? "" : "hide-bong"}/>
                            <img src={image2} className={this.state.activeID == 2 ? "" : "hide-bong"}/>
                            <img src={image3} className={this.state.activeID == 3 ? "" : "hide-bong"}/>
                            <img src={image4} className={this.state.activeID == 4 ? "" : "hide-bong"}/>
                        </div>
                        </div>
                        <button className="btn btn-default btn-prev" ref={ref => this.previousButton = ref} onClick={this.handlePrevClick}>
                            Previous</button>
                        <button className="btn btn-default btn-next" ref={ref => this.nextButton = ref} onClick={this.handleNextClick}>
                            Next</button>
                        &nbsp;&nbsp;&nbsp;
                        <button className="btn btn-default btn-play" ref={ref => this.playButton = ref}>
                            Play</button>
                    </div>
                </div>
        </div>

    );
  }
}

export default App;
