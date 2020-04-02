import { Component, OnInit } from '@angular/core';
import { InformationService } from '../services/information.service'
import { Information } from '../services/Information';

@Component({
  selector: 'app-blog',
  templateUrl: '../blog/blog.component.html',
  styleUrls: ['../blog/blog.component.css']
})
export class BlogComponent implements OnInit {
  
  informations : Information;
  
  constructor(private informationService: InformationService) {
  
    this.informations = new Information();
  
  }

  ngOnInit(): void {
  }

}
