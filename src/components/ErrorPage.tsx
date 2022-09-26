// connecting to nodes is time consuming sometimes, it's better to give users a loading page
import React from 'react';
import ReactLoading from 'react-loading';
import ErrorPageStyle from './styles/ErrorPageStyle';

export enum ErrorType {
    API_CONNECTING,
    NO_EXTENSION,
}

export type ILoadingPageProps = {
    errorType: ErrorType
}

const LoadingPage = ({ errorType }: ILoadingPageProps) => {
    return <ErrorPageStyle>
        {
            errorType === ErrorType.API_CONNECTING && <>
                <ReactLoading type="spin" color="#eee" />
                <div className="loading-desc">Connecting to Polkadot network...</div>
            </>
        }
        {
            errorType === ErrorType.NO_EXTENSION && <>
                <div>No browser extension installed, please install one from
                    <a className="download-link"
                        href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd"
                        target="_blank"
                        rel="noreferrer"
                    >HERE</a>
                </div>
            </>
        }
    </ErrorPageStyle>;
};

export default LoadingPage;
