import * as React from 'react';
import {circlr} from 'circlr';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface RotatingBongProps {
    bottomBongLookUp: [number, string][];
    middleBongLookUp: [number, string][];
    topBongLookUp: [number, string][];

}
interface RotatingBongState {
    activeTopBongID: number;
    activeMiddleBongID: number;
    activeBottomBongID: number;
    topBongImages: [number, string][];
    middleBongImages: [number, string][];
    bottomBongImages: [number, string][];
}

enum BongPiece {
    BottomBong,
    MiddleBong,
    TopBong
}

export class RotatingBong extends React.Component<RotatingBongProps, RotatingBongState> {
    /* tslint:disable */
    constructor(props) {
        super(props);

        this.state = {
            activeTopBongID: 0,
            activeMiddleBongID: 0,
            activeBottomBongID: 0,
            topBongImages: this.props.topBongLookUp,
            middleBongImages: this.props.middleBongLookUp,
            bottomBongImages: this.props.bottomBongLookUp,
        };
    }

    componentDidMount() {
        this.setState({
            topBongImages: this.props.topBongLookUp,
            middleBongImages: this.props.middleBongLookUp,
            bottomBongImages: this.props.bottomBongLookUp,
            activeTopBongID: 0,
            activeMiddleBongID: 0,
            activeBottomBongID: 0,
        }, () => {
            this.toggleActive(1, BongPiece.TopBong);
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            topBongImages: this.props.topBongLookUp,
            middleBongImages: this.props.middleBongLookUp,
            bottomBongImages: this.props.bottomBongLookUp,
        });
    }

    componentWillUnmount(){

    }

    toggleActive = (newActiveID: number, type: BongPiece) => {
        this.setState({
            activeTopBongID: type == BongPiece.TopBong ? newActiveID : this.state.activeTopBongID,
            activeMiddleBongID: type == BongPiece.MiddleBong ? newActiveID : this.state.activeMiddleBongID,
            activeBottomBongID: type == BongPiece.BottomBong ? newActiveID : this.state.activeBottomBongID
        });
    };

    handleNextClick = (bongPieceType: BongPiece) => {
        let currentActiveIndex: number = 0;
        let currentActiveIndexIsLast: boolean = false;

        if (bongPieceType == BongPiece.TopBong)
        {
            currentActiveIndex = this.props.topBongLookUp.filter(x => x[0] == this.state.activeTopBongID)[0][0];
            currentActiveIndexIsLast = currentActiveIndex === (this.props.topBongLookUp.length - 1);
        }

        if (bongPieceType == BongPiece.MiddleBong)
        {
            currentActiveIndex = this.props.middleBongLookUp.filter(x => x[0] == this.state.activeMiddleBongID)[0][0];
            currentActiveIndexIsLast = currentActiveIndex === (this.props.middleBongLookUp.length - 1);
        }

        if (bongPieceType == BongPiece.BottomBong)
        {
            currentActiveIndex = this.props.bottomBongLookUp.filter(x => x[0] == this.state.activeBottomBongID)[0][0];
            currentActiveIndexIsLast = currentActiveIndex === (this.props.middleBongLookUp.length - 1);
        }

        this.setState({
            activeTopBongID: bongPieceType == BongPiece.TopBong ? (currentActiveIndexIsLast ? 0 : (currentActiveIndex + 1)) : this.state.activeTopBongID,
            activeMiddleBongID: bongPieceType == BongPiece.TopBong ? (currentActiveIndexIsLast ? 0 : (currentActiveIndex + 1)) : this.state.activeMiddleBongID,
            activeBottomBongID: bongPieceType == BongPiece.TopBong ? (currentActiveIndexIsLast ? 0 : (currentActiveIndex + 1)) : this.state.activeBottomBongID,
        });
    };

    handlePrevClick = (bongPieceType: BongPiece) => {
        let currentActiveIndex: number = 0;
        let currentActiveIndexIsFirst: boolean = false;

        if(bongPieceType == BongPiece.TopBong)
        {
            currentActiveIndex = this.props.topBongLookUp.filter(x => x[0] == this.state.activeTopBongID)[0][0];
            currentActiveIndexIsFirst = currentActiveIndex === 0;
        }

        if(bongPieceType == BongPiece.MiddleBong)
        {
            currentActiveIndex = this.props.middleBongLookUp.filter(x => x[0] == this.state.activeMiddleBongID)[0][0];
            currentActiveIndexIsFirst = currentActiveIndex === 0;
        }

        if(bongPieceType == BongPiece.BottomBong)
        {
            currentActiveIndex = this.props.bottomBongLookUp.filter(x => x[0] == this.state.activeBottomBongID)[0][0];
            currentActiveIndexIsFirst = currentActiveIndex === 0;
        }

        this.setState({
            activeTopBongID: bongPieceType == BongPiece.TopBong ? (currentActiveIndexIsFirst ? (this.props.topBongLookUp.length - 1) : (currentActiveIndex - 1)) : this.state.activeTopBongID,
            activeMiddleBongID: bongPieceType == BongPiece.TopBong ? (currentActiveIndexIsFirst ? (this.props.middleBongLookUp.length - 1) : (currentActiveIndex - 1)) : this.state.activeMiddleBongID,
            activeBottomBongID: bongPieceType == BongPiece.TopBong ? (currentActiveIndexIsFirst ? (this.props.bottomBongLookUp.length - 1) : (currentActiveIndex - 1)) : this.state.activeBottomBongID
        });
    };

    renderBong = (type: BongPiece, topBong?: [number, any], middleBong?: [number, any], bottomBong?: [number, any]) => {
         if(type == BongPiece.MiddleBong && middleBong) {
            return (
                    <div className={this.state.activeMiddleBongID == middleBong[0] ? "drewfis-container" : "hide-bong drewfis-container"}>
                        <div className={"bong-image-holder"}>
                            <img src={middleBong[1]} className={"bong-image"}/>
                        </div>

                        <i aria-hidden="true" onClick={() => this.handleNextClick(BongPiece.MiddleBong)} className={"nextCircle"}>
                            <FontAwesomeIcon icon="arrow-right" className={"next"}/>
                        </i>

                        <i aria-hidden="true" onClick={() => this.handlePrevClick(BongPiece.MiddleBong)} className={"prevCircle"}>
                            <FontAwesomeIcon icon="arrow-left" className={"previous"}/>
                        </i>
                    </div>
            );
        }
        else if(type == BongPiece.BottomBong && bottomBong) {
            return (
                    <div
                        className={this.state.activeBottomBongID == bottomBong[0] ? "drewfis-container" : "hide-bong drewfis-container"}>
                        <div className={"bong-image-holder"}>
                            <img src={bottomBong[1]} className={"bong-image"}/>
                        </div>

                        <i aria-hidden="true" onClick={() => this.handleNextClick(BongPiece.BottomBong)}
                           className={"nextCircle"}>
                            <FontAwesomeIcon icon="arrow-right" className={"next"}/>
                        </i>

                        <i aria-hidden="true" onClick={() => this.handlePrevClick(BongPiece.BottomBong)}
                           className={"prevCircle"}>
                            <FontAwesomeIcon icon="arrow-left" className={"previous"}/>
                        </i>
                    </div>
            );
        }
    };

    public render() {
        return (
                <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 scroll-drew">
                    {this.state.topBongImages && this.state.topBongImages.map(topBong => this.renderBong(BongPiece.TopBong, topBong, null, null))}
                    {this.state.middleBongImages && this.state.middleBongImages.map(midBong => this.renderBong(BongPiece.MiddleBong, null,  midBong))}
                    {this.state.bottomBongImages && this.state.bottomBongImages.map(botBong => this.renderBong(BongPiece.BottomBong, null, null, botBong))}

                    <Button bsStyle="primary" className={"btn-block"} style={{marginTop: "10px", marginBottom: "10px"}}>Upgrade Bowl</Button>
                    <Button bsStyle="success" className={"btn-block"} style={{marginTop: "10px", marginBottom: "10px"}}>Purchase</Button>
                </div>
        );
    }
}

export default RotatingBong;
