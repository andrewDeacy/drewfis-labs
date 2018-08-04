import { Navbar, Nav, NavItem } from 'react-bootstrap';
import * as React from 'react';
import { RotatingBong } from './Components/RotatingBong';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'


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
    lookUp: [number, any][]
}

class App extends React.Component<AppProps, AppState> {

    constructor(props) {
        super(props);

        // add font awesome icons
        library.add(faArrowLeft);
        library.add(faArrowRight);

        this.state = {
            activeID: 1,
            lookUp: this.generateImageLookUp(this.imagePaths)
        };
    }

    private bongImages = document.querySelector('.image-container');
    private nextButton: HTMLButtonElement;
    private previousButton: HTMLButtonElement;
    private playButton: HTMLButtonElement;

    private imagePaths: any[] =
    [
        image1,
        image2,
        image3,
        image4
    ];

    componentDidMount() {
        this.setState({
            lookUp: this.generateImageLookUp(this.imagePaths)
        });
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

    generateImageLookUp(imagePaths: any[]): [number, string][] {
        let returnValues: [number, any][] = [];
        return imagePaths.map((image, index) => returnValues[index] = [index, image])
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


            <RotatingBong bongImagePathIDLookUp={this.state.lookUp}/>
        </div>

    );
  }
}

export default App;
