import { useState } from "react";
import {
  FileText,
  Image,
  Download,
  Eye,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "image";
  url: string;
  uploadDate: string;
  size: string;
}

interface DocumentViewerProps {
  documents: Document[];
}

export function DocumentViewer({ documents }: DocumentViewerProps) {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
    setZoomLevel(1);
  };

  const handleCloseViewer = () => {
    setSelectedDocument(null);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleDownload = (document: Document) => {
    const link = window.document.createElement("a");
    link.href = document.url;
    link.download = document.name;
    link.click();
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((document) => (
          <div
            key={document.id}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
            onClick={() => handleDocumentClick(document)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                {document.type === "pdf" ? (
                  <FileText className="h-8 w-8 text-red-500 mr-3" />
                ) : (
                  <Image className="h-8 w-8 text-blue-500 mr-3" />
                )}
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">
                    {document.name}
                  </h3>
                  <p className="text-xs text-gray-500">{document.size}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(document);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>

            {document.type === "image" && (
              <div className="mb-3">
                <img
                  src={document.url}
                  alt={document.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}

            {document.type === "pdf" && (
              <div className="mb-3 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="h-16 w-16 text-gray-400" />
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Uploaded: {new Date(document.uploadDate).toLocaleDateString()}
              </span>
              <button className="flex items-center text-xs text-blue-600 hover:text-blue-800">
                <Eye className="h-3 w-3 mr-1" />
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                {selectedDocument.type === "pdf" ? (
                  <FileText className="h-5 w-5 text-red-500 mr-2" />
                ) : (
                  <Image className="h-5 w-5 text-blue-500 mr-2" />
                )}
                <h3 className="font-medium text-gray-900">
                  {selectedDocument.name}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                {selectedDocument.type === "image" && (
                  <>
                    <button
                      onClick={handleZoomOut}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <span className="text-sm text-gray-500">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDownload(selectedDocument)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={handleCloseViewer}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4">
              {selectedDocument.type === "image" ? (
                <div className="flex justify-center">
                  <img
                    src={selectedDocument.url}
                    alt={selectedDocument.name}
                    className="max-w-full h-auto"
                    style={{ transform: `scale(${zoomLevel})` }}
                  />
                </div>
              ) : (
                <div className="w-full h-full min-h-[600px]">
                  <iframe
                    src={selectedDocument.url}
                    className="w-full h-full border-0 rounded-lg"
                    title={selectedDocument.name}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
