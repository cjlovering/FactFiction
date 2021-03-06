import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Button from './Button';
import Sentence from './Sentence';
import { VIEW_INPUT } from '../constants/viewTypes';
import _ from '../../stylesheets/components/_ResultPane.scss';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

export default class ResultPane extends React.Component {
    static propTypes = {
        selectedEntryId: PropTypes.string.isRequired,
        selectEntry: PropTypes.func.isRequired,
        textEntrySentences: PropTypes.array.isRequired,
        changeView: PropTypes.func.isRequired,
        similarSentenceIds: PropTypes.object.isRequired,
        fetchSimilarSentences: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,        
        textEntry: PropTypes.string.isRequired,        
    }
    
    render() {
        const { 
            selectedEntryId, 
            selectEntry, 
            textEntrySentences, 
            changeView, 
            similarSentenceIds,
            fetchSimilarSentences,
            isFetching,
            textEntry
        } = this.props;

        const objectiveCount = textEntrySentences.filter(e => e.type == "OBJECTIVE").length;
        const percentObjective = isFetching ? 0 : parseFloat(objectiveCount * 100.0 / textEntrySentences.length).toFixed(1);
        const resultDisplayText = isFetching ? textEntry : ( 
            <div className="result-box" id="result-box">
                {
                    textEntrySentences.map(entry => (
                        <Sentence
                            {...entry}
                            selectedEntryId={selectedEntryId}
                            selectEntry={selectEntry}
                            key={shortid.generate()}   
                            similarSentenceIds={similarSentenceIds} 
                            fetchSimilarSentences={fetchSimilarSentences}
                        />
                        )
                    )
                }
            </div>
        );
        const progress = isFetching ? null : (
            <div>
                <Progress 
                    percent={percentObjective} 
                    status="success" 
                    theme={{
                        success: {
                        symbol: percentObjective + '%',
                        color: '#7cbb00'
                        }
                    }}
                />
                <span> {percentObjective}% of the sentences in this document are objective. </span>
            </div>
        )
        return (
            <div>
                <div className="left-bar">{resultDisplayText}</div>
                {progress}
                <Button 
                    handleClick={() => changeView(VIEW_INPUT)} 
                    content="Back"
                />
            </div>
        );
    }
}
