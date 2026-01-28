import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Results() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalysis();
  }, [id]);

  const fetchAnalysis = async () => {
    try {
      const response = await axios.get(`/api/analysis/${id}`);
      setData(response.data.data);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full size-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analysis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/upload" className="text-blue-600 hover:underline">
            ← Back to Upload
          </Link>
        </div>
      </div>
    );
  }

  const analysis = data.ai_analysis;
  const riskColor = 
    analysis.risk_score >= 7 ? 'red' :
    analysis.risk_score >= 4 ? 'yellow' :
    'green';
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="mx-w-4xl mx-auto">

        {/* header */}
        <div className="mb-6">
          <Link to="/upload" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Analyze Another Contract
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Contract Analysis Results
          </h1>
          <p className="text-gray-600 mt-2">File: {data.file_name}</p>
        </div>

        {/* risk score */}
        <div className={`bg-white p-6 rounded-lg shadow mb-6 border left-4
          ${
            riskColor === 'red' ? 'border-red-500' :
            riskColor === 'yellow' ? 'border-yellow-500' :
            'border-green-500'
          }
        `}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Risk Score</h2>
              <p className="text-sm text-gray-500">Overall assesment</p>
            </div>
            <div className={`text-5xl font-bold
              ${
                riskColor === 'red' ? 'text-red-600' :
                riskColor === 'yellow' ? 'text-yellow-600' :
                'text-green-600'
              }
            `}>
              {analysis.risk_score}/10
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm font-medium text-gray-700">Contract Type:</p>
            <p className="text-lg">{analysis.contract_type || 'Unknown'}</p>
          </div>
        </div>

        {/* summary */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-bold mb-3">Summary</h2>
          <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
        </div>

        {/* red flags */}
        {analysis.red_flags?.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              ⚠️ Red Flags ({analysis.red_flags.length})
            </h2>
            <div className="space-y-4">
              {analysis.red_flags.map((flag, i) => (
                <div key={i} className="border-l-4 border-red-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 text-xs font-semibold rounded 
                    ${
                      flag.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      flag.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                      flag.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {flag.severity?.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">{flag.category}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{flag.issue}</h3>
                  <p className="text-sm text-gray-700 mb-2">{flag.detail}</p>
                  <p className="text-sm text-blue-700">
                    <strong>Rekomendasi:</strong> {flag.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* green flags */}
        {analysis.green_flags?.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-bold text-green-600 mb-4">
              ✅ Green Flags ({analysis.green_flags.length})
            </h2>
            <ul className="space-y-2">
              {analysis.green_flags.map((flag, i) => (
                <li key={i} className="flex items-start mt-1">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-gray-700">{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* key actions */}
        {analysis.key_actions?.length > 0 && (
          <div className="bg-blue-50 p-6 rounded-lg shadow mb-6 border border-blue-200">
            <h2 className="text-xl font-bold text-blue-600 mb-4">
              📋 Recommended Actions
            </h2>
            <ol className="space-y-3">
              {analysis.key_actions.map((action, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 size-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <span className="text-gray-800">{action}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* metadata */}
        <div className="bg-gray-100 p-4 rounded text-sm text-gray-600">
          <p>Analysis ID: {data.id}</p>
          <p>Processed: {new Date(data.created_at).toLocaleString('id-ID')}</p>
          <p>Processing Time: {data.processing_time_ms}ms</p>
        </div>

      </div>
    </div>
  );
}

export default Results;