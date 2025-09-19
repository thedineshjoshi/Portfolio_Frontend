import { Component } from '@angular/core';
import { manageCertificates } from '../../Model/jwtPayload/manage-certificates.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiCallService } from '../../service/api-call.service';

@Component({
  selector: 'app-manage-certificates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-certificates.component.html',
  styleUrl: './manage-certificates.component.css',
})
export class ManageCertificatesComponent {
  editor: any;
  certificates: manageCertificates = {
    certification_Date: '',
    certificateImageUrl: '',
  };
  constructor(private apiCallService: ApiCallService) {}

  uploadImage(file: File) {
    this.apiCallService.uploadImage(file).subscribe(
      (response: any) => {
        if (this.editor) {
          const range = this.editor.getSelection();
          if (range) {
            const imageUrl = response.url;
            this.editor.insertEmbed(range.index, 'image', imageUrl);
          } else {
            console.warn('No selection range found in the editor.');
          }
        } else {
          console.error('Editor is not initialized.');
        }
      },
      (error) => {
        console.error('Image upload failed:', error);
      }
    );
  }

  addCertificate() {
    this.apiCallService.addCertificate(this.certificates).subscribe(
      (res) => {
        alert('Certificate Added Successfully');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
