import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

    private nextButton: HTMLButtonElement;
    private previousButton: HTMLButtonElement;

    componentDidMount() {
        this.setState({
            bongImages: this.props.bongImagePathIDLookUp,
            activeBongID: 0
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            bongImages: nextProps.bongImages
        });
    }

    componentWillMount(){

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
            <div className={this.state.activeBongID == bong[0] ? "" : "hide-bong"}>
                <img src={bong[1]} />

                    <i aria-hidden="true" onClick={this.handleNextClick} className={"nextCircle"}>
                        <FontAwesomeIcon icon="arrow-right" className={"next"}/>
                    </i>

                    <i aria-hidden="true" onClick={this.handlePrevClick} className={"prevCircle"}>
                        <FontAwesomeIcon icon="arrow-left" className={"previous"}/>
                    </i>
            </div>
        );
    };

    public render() {
        return (
            <div className="container text-center">
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12">
                        <div className="drewfis-labs image-container" style={{ width: "100%" }}/>
                        <div>
                            {this.props.bongImagePathIDLookUp && this.props.bongImagePathIDLookUp.map(bong => this.renderBong(bong))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RotatingBong;
