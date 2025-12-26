import ResultPreview from './ResultPreview';

const ResultsDashboard = ({ data }) => {
    return (
        <div className="space-y-12 text-left">
            <ResultPreview data={data} />
        </div>
    );
};

export default ResultsDashboard;
