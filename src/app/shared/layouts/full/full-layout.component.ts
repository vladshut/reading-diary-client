import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

const fireRefreshEventOnWindow = function () {
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('resize', true, false);
    window.dispatchEvent(evt);
};

@Component({
    selector: 'app-full-layout',
    templateUrl: './full-layout.component.html',
    styleUrls: ['./full-layout.component.scss']
})

export class FullLayoutComponent implements OnInit {
    sidebarToggle = true;
    
    constructor(private elementRef: ElementRef, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.setSidebarToggle();
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.setSidebarToggle();
            }
        });
        
        // sidebar toggle event listener
        const sideBarToggle = this.elementRef.nativeElement.querySelector('#sidebarToggle');
        if (sideBarToggle) {
            sideBarToggle.addEventListener('click', this.onClick.bind(this));
        }

        // customizer events
        const compactMenuToggle = this.elementRef.nativeElement.querySelector('#cz-compact-menu');
        if (compactMenuToggle) {
            compactMenuToggle.addEventListener('click', this.onClick.bind(this));
        }

        const sidebarWidthToggle = this.elementRef.nativeElement.querySelector('#cz-sidebar-width');
        if (sidebarWidthToggle) {
            sidebarWidthToggle.addEventListener('click', this.onClick.bind(this));
        }
    }

    onClick(event) {
        // initialize window resizer event on sidebar toggle click event
        setTimeout(() => { fireRefreshEventOnWindow(); }, 300);
    }
    
    private setSidebarToggle() {
        this.sidebarToggle = this.getRouteDataParam(this.route, 'sidebar', this.sidebarToggle);
    }
    
    private getRouteDataParam(route: ActivatedRoute, dataName: string, defaultValue: any) {
        const data = route.snapshot.data;
    
        if (data[dataName] !== undefined) {
            defaultValue = data[dataName];
        }
        
        if (route.firstChild instanceof ActivatedRoute) {
            return this.getRouteDataParam(route.firstChild, dataName, defaultValue);
        }
        
        return defaultValue;
    }
}
