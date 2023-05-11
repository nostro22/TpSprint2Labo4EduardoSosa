import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css']
})
export class QuienSoyComponent {
  readmeContent?: SafeHtml;

  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const url = 'https://api.github.com/repos/nostro22/Nostro22/readme';
    const options = { headers: { Accept: 'application/vnd.github.v3.raw' } };

    this.http.get(url).subscribe((data: any) => {
      const markdown = atob(data.content); 
      // Use atob() to decode the base64-encoded content string
      const sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(markdown);
      this.readmeContent = sanitizedHtml as SafeHtml;
    });
    
  }
}

