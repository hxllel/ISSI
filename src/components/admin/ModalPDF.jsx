import "./ModalPDF.css";

export default function ModalPDF({ open, onClose, children }) {
    if (!open) return null;

    return (
        <div className="pdfModal-overlay">
            <div className="pdfModal-box">
                <button className="pdfModal-close" onClick={onClose}>✖</button>

                <div className="pdfModal-content">
                    {children}
                </div>
            </div>
        </div>
    );
}
