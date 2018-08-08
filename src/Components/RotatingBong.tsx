import * as React from 'react';
import {circlr} from 'circlr';
import {Button} from 'react-bootstrap';

import ScrollTrigger from 'react-scroll-trigger';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {setInterval} from "timers";

interface RotatingBongProps {
    bongImagePathIDLookUp: [number, string][];
}
interface RotatingBongState {
    activeBongID: number,
    bongImages: [number, string][];
}

export class RotatingBong extends React.Component<RotatingBongProps, RotatingBongState> {

    constructor(props) {
        super(props);

        this.state = {
            activeBongID: 1,
            bongImages: this.props.bongImagePathIDLookUp
        };
    }

    private scrollDiv: HTMLElement;

    debounce = (func, wait) => {
        console.log(func);
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        }
    }

    componentDidMount() {
        if (this.scrollDiv)
            this.scrollDiv.addEventListener('wheel', this.debounce((e) => { this.handleWheel(e) }, 15));

        this.setState({
            bongImages: this.props.bongImagePathIDLookUp,
            activeBongID: 0
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            bongImages: nextProps.bongImagePathIDLookUp
        });
    }

    handleWheel = (e) => {
        if (e.deltaY < 0) {
            console.log('scrolling up');
            this.handleNextClick();
        }
        if (e.deltaY > 0) {
            console.log('scrolling down');
            this.handlePrevClick();
        }
        if(e.deltaX > 0){
            console.log('scrolling right')
            this.handleNextClick();
        }
        if(e.deltaX < 0){
            console.log('scrolling left')
            this.handlePrevClick();
        }
    }

    debounceWheel = () => {
        this.debounce((e) => { this.handleWheel(e) }, 15);
    }


    handleTouchStart = (e) => {

    }


    componentWillUnmount(){
        if(this.scrollDiv)
            this.scrollDiv.removeEventListener('wheel', this.debounce((e) => { this.handleWheel(e) }, 15));
    }

    toggleActive = (newActiveID: number) => {
        this.setState({
            activeBongID: newActiveID
        });
    };

    handleNextClick = () => {
        let currentActiveIndex: number = this.props.bongImagePathIDLookUp.filter(x => x[0] == this.state.activeBongID)[0][0];
        let currentActiveIndexIsLast: boolean = currentActiveIndex === (this.props.bongImagePathIDLookUp.length - 1);

        this.setState({
            activeBongID: currentActiveIndexIsLast ? 0 : (currentActiveIndex + 1)
        });
    };

    handlePrevClick = () => {
        let currentActiveIndex: number = this.props.bongImagePathIDLookUp.filter(x => x[0] == this.state.activeBongID)[0][0];
        let currentActiveIndexIsFirst = currentActiveIndex === 0;

        this.setState({
            activeBongID: currentActiveIndexIsFirst ? (this.props.bongImagePathIDLookUp.length - 1) : (currentActiveIndex - 1)
        });
    };

    renderBong = (bong: [number, any]) => {
        return (
            <div onWheel={this.debounceWheel} >
            <ScrollTrigger >
                <div className={this.state.activeBongID == bong[0] ? "drewfis-container" : "hide-bong drewfis-container"}>
                    <div>
                    <div className={"bong-image-holder"}>
                        <img src={bong[1]} className={"bong-image"}/>
                    </div>

                        <i aria-hidden="true" onClick={this.handleNextClick} className={"nextCircle"}>
                            <FontAwesomeIcon icon="arrow-right" className={"next"}/>
                        </i>

                        <i aria-hidden="true" onClick={this.handlePrevClick} className={"prevCircle"}>
                            <FontAwesomeIcon icon="arrow-left" className={"previous"}/>
                        </i>
                    </div>
                </div>
                </ScrollTrigger>
            </div>
        );
    };

    public render() {
        return (
            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 scroll-drew" ref={ref => this.scrollDiv = ref}>
                                    {this.state.bongImages && this.state.bongImages.map(bong => this.renderBong(bong))}
                <Button bsStyle="primary" className={"btn-block"} style={{marginTop: "10px", marginBottom: "10px"}}>Upgrade Bowl</Button>
                <Button bsStyle="success" className={"btn-block"} style={{marginTop: "10px", marginBottom: "10px"}}>Purchase</Button>
            </div>
        );
    }
}

export default RotatingBong;
