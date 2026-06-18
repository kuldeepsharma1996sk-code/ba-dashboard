"use client";

import { useState, useEffect } from 'react';
import { Upload, FileType, CheckCircle, AlertCircle, Copy, RefreshCw } from 'lucide-react';
import { FileLog } from '@/lib/db';

export default function DataUploadPortal() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<FileLog[]>([]);
  const [copied, setCopied] = useState(false);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/inventory/logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setStatus('idle');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('uploadedBy', 'Data Team');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setStatus('success');
        setFile(null);
        fetchLogs(); // refresh logs
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setUploading(false);
    }
  };

  const copyApiEndpoint = () => {
    navigator.clipboard.writeText('POST /api/upload');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Data Upload Portal</h1>
        <p className="text-slate-500 mb-8">Upload the daily Products Report CSV. The Dashboard will automatically update upon success.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Upload New File</h2>
            
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <Upload className="w-10 h-10 text-slate-400 mb-4" />
              <div className="text-sm font-medium text-slate-700 mb-1">
                Drag and drop your CSV here
              </div>
              <div className="text-xs text-slate-500 mb-4">
                or click to browse from your computer
              </div>
              <input 
                type="file" 
                accept=".csv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>
            
            {file && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-center gap-3">
                <FileType className="w-5 h-5 text-blue-500" />
                <div className="flex-1">
                  <div className="text-sm font-bold text-blue-900">{file.name}</div>
                  <div className="text-xs text-blue-600">{(file.size / 1024).toFixed(1)} KB</div>
                </div>
              </div>
            )}
            
            <button 
              onClick={handleUpload}
              disabled={!file || uploading}
              className={`w-full mt-4 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
                !file || uploading ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {uploading ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Uploading...</>
              ) : (
                'Upload & Process Data'
              )}
            </button>
            
            {status === 'success' && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center gap-2 text-emerald-700 text-sm font-medium">
                <CheckCircle className="w-4 h-4" /> Successfully uploaded and updated dashboard.
              </div>
            )}
            
            {status === 'error' && (
              <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-700 text-sm font-medium">
                <AlertCircle className="w-4 h-4" /> Failed to process upload. Please check file format.
              </div>
            )}
          </div>
          
          {/* API Integration Section */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 mb-4">API Integration Option</h2>
            <p className="text-sm text-slate-600 mb-6">
              You can automate the daily uploads by sending a POST request to our webhook. The dashboard will instantly reflect the changes.
            </p>
            
            <div className="bg-slate-900 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">ENDPOINT</div>
                <button onClick={copyApiEndpoint} className="text-slate-400 hover:text-white transition-colors">
                  {copied ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="font-mono text-sm text-green-400">
                <span className="text-pink-500">POST</span> /api/upload
              </div>
            </div>
            
            <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200 mt-auto">
              <strong>Payload Requirement:</strong> Send as `multipart/form-data` with the file attached to the `file` field.
            </div>
          </div>
        </div>

        {/* Daily Logs Table */}
        <div className="mt-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Daily File Log</h2>
            <button onClick={fetchLogs} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-3 font-semibold text-slate-600">Date</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">Time</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">Filename</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">Records Parsed</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">Uploaded By</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No file logs found.</td>
                  </tr>
                ) : (
                  logs.map(log => (
                    <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3 font-medium text-slate-700">{log.uploadDate}</td>
                      <td className="px-6 py-3 text-slate-500">{log.uploadTime}</td>
                      <td className="px-6 py-3 text-blue-600 font-medium">{log.filename}</td>
                      <td className="px-6 py-3 text-slate-700">{log.recordsParsed.toLocaleString()}</td>
                      <td className="px-6 py-3 text-slate-500">{log.uploadedBy}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
