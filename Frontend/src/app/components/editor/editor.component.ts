import { Component } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  BalloonEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Underline,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Undo,
  CodeBlock
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CKEditorModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {

  public Editor = BalloonEditor;
  public config = {
    toolbar: [
      'undo', 'redo', '|',
      'heading', '|', 'bold', 'italic', 'underline', '|',
      'link', 'mediaEmbed', 'codeBlock', '|',
      'bulletedList', 'numberedList', 'indent', 'outdent'
    ],
    plugins: [
      Bold,
      Essentials,
      Heading,
      Indent,
      IndentBlock,
      Italic,
      Underline,
      Link,
      List,
      MediaEmbed,
      Paragraph,
      Undo,
      CodeBlock
    ],
    codeBlock: {
      languages: [
        { language: 'cs', label: 'C#' },
        { language: 'javascript', label: 'JavaScript' },
        { language: 'html', label: 'HTML' },
        { language: 'css', label: 'CSS' },
        { language: 'javascript', label: 'JavaScript' },
        { language: 'typescript', label: 'TypeScript' }
      ]
    }
  }
}
